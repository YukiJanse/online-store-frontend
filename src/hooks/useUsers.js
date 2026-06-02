import { useEffect, useState } from 'react';
import { usersApi } from '../api/users';

export function useUsers() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchUser() {
            try {
                setLoading(true);
                setError(null);

                const data = await usersApi.me();

                if (!cancelled) {
                    setUserInfo(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchUser();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        userInfo,
        loading,
        error,
    };
}