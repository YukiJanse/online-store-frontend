import { request } from './client'

export const usersApi = {
    register: (data) => 
        request('users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
    login: (data) =>
        request('users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
    refresh: () =>
        request('users/refresh', {
            method: 'POST',
        }),
};