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
    logout: () =>
        request('users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }),
    refresh: () =>
        request('users/refresh', {
            method: 'POST',
        }),
    me: () =>
        request('users/me', {
            method: 'GET',
        }),
    updateNames: (data) =>
        request('users/names', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
    updateProfile: (data) =>
        request('users/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
};