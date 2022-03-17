export interface AuthData {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthDataState {
    authData: AuthData;
}
