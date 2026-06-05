const BASE_URL = 'https://yukijanse-store.duckdns.org/v1';

let refreshPromise = null;

export async function request(url, options = {}) {
  const token = localStorage.getItem('accessToken');

  let response = await fetch(`${BASE_URL}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    credentials: 'include',
  });

  if (response.status !== 401) {
    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  // Prevent multiple refresh calls simultaneously
  if (!refreshPromise) {
    refreshPromise = fetch(`${BASE_URL}/users/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error('Refresh failed');
        }

        const data = await r.json();

        localStorage.setItem(
          'accessToken',
          data.accessToken
        );

        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  const newToken = await refreshPromise;

  response = await fetch(`${BASE_URL}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${newToken}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}