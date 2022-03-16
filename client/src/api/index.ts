import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

interface registerParams {
    username: String;
    password: String;
}

export const register = (params: registerParams) =>
    api({
        method: 'POST',
        url: '/api/v1/admin/register',
        params,
    });

export const login = (params: registerParams) =>
    api({
        method: 'POST',
        url: '/api/v1/admin/login',
        params,
    });
