export interface AuthData {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthReducer {
    authData: AuthData;
}

export interface AuthDataState {
    authReducer: AuthReducer;
}

export interface StoreData {
    id: number;
    name: string;
    adminUser: number;
    currency: string;
    location: string;
}

export interface StoreReducer {
    storeData: [StoreData];
}

export interface StoreDataState {
    storeReducer: StoreReducer;
}

export interface EmployeeData {
    id: number;
    name: string;
    password: string;
    wage: number;
    status: string;
    startingDate: string;
    store: number;
}
