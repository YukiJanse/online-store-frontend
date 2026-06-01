import { request } from './client'

export const ordersApi = {
    getAll: () => request('orders'),
    getById: (id) => request(`orders/${id}`),
    changeQuantity: (id, data) =>
        request(`orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
    changeShippingInfo: (id, newInfo) =>
        request(`orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newInfo)
        }),
    deleteOrder: (id) =>
        request(`orders/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }),
};