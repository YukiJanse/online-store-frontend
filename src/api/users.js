import { request } from './client'

export const usersApi = {
    register: (data) => 
        request('users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
    login: (email, password) =>
        request('users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            })
        }),
    refresh: () =>
        request('users/refresh', {
            method: 'POST',
        }),
    me: () =>
        request('users/me', {
            method: 'GET',
        })
};