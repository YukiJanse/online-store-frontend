const BASE_URL = 'http://localhost:5000/v1/';

export async function request(path, options = {}) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {}),
        },
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    if (res.status === 204) {
        return null;
    }

    return res.json();
}