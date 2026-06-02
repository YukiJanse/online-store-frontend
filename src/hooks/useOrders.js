import { useEffect, useState } from 'react';
import { ordersApi } from '../api/orders';

export function useOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchOrders() {
            try {
                setLoading(true);
                setError(null);

                const data = await ordersApi.getAll();

                if (!cancelled) {
                    setOrders(data);
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

        fetchOrders();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        orders,
        loading,
        error,
    };
}