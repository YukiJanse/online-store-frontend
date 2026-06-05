import { request } from './client'

export const productsApi = {
    getAll: () => request('products'),
    getById: (id) => request(`products/${id}`),
    checkInventory: (id) => request(`products/inventory/${id}`),
    getCategories: () => request('products/categories'),
    getByCategory: (cat) => request(`products/category/${encodeURIComponent(cat)}`),
};

