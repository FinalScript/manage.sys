import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080' });

interface registerParams {
    username: String;
    password: String;
}

export const setBearerToken = (token: string) => {
    api.defaults.headers.common = { Authorization: token };
};

export const getBearerToken = () => {
    return api.defaults.headers.common;
};

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

export const getAuthData = () => {
    return api({
        method: 'GET',
        url: '/api/v1/admin',
    });
};

interface StoreParams {
    storeName: string;
}

export const createNewStore = (params: StoreParams) => {
    return api({
        method: 'POST',
        url: '/api/v1/store',
        params,
    });
};

export const getStores = () => {
    return api({
        method: 'GET',
        url: '/api/v1/store',
    });
};

interface DeleteStoreParams {
    password: string;
}

export const deleteStore = (storeId: number, params: DeleteStoreParams) => {
    return api({
        method: 'DELETE',
        url: `/api/v1/store/${storeId}`,
        params,
    });
};

interface UpdateStoreParams {
    password: string;
    storeName: string;
}

export const updateStore = (storeId: number, params: UpdateStoreParams) => {
    return api({
        method: 'PATCH',
        url: `/api/v1/store/${storeId}`,
        params,
    });
};

export const getEmployees = (storeId: number) => {
    return api({
        method: 'GET',
        url: `/api/v1/store/${storeId}/employee`,
    });
};

interface EmployeeParams {
    name: string;
}

interface UpdateEmployeeParams {
    wage: number;
    status: string;
    startingDate: string;
}

export const createNewEmployee = (storeId: number, params: EmployeeParams) => {
    return api({
        method: 'POST',
        url: `/api/v1/store/${storeId}/employee`,
        params,
    });
};

export const deleteEmployees = (storeId: number, employeeId: number) => {
    return api({
        method: 'DELETE',
        url: `/api/v1/store/${storeId}/employee/${employeeId}`,
    });
};

export const updateEmployees = (storeId: number, employeeId: number, params: UpdateEmployeeParams) => {
    return api({
        method: 'PATCH',
        url: `/api/v1/store/${storeId}/employee/${employeeId}`,
        params,
    });
};
