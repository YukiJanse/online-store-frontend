import { request } from './client'

export const productsApi = {
    getAll: () => request('products/public'),
    getById: (id) => request(`products/public/${id}`),
    checkInventory: (id) => request(`products/inventory/${id}`),
    getCategories: () => request('products/categories'),
    getByCategory: (cat) => request(`products/category/${encodeURIComponent(cat)}`),
};

