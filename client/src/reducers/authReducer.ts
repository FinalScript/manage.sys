import { AUTH, LOGOUT } from '../constants/actions';

const authReducer = (state = { authData: null }, action: any) => {
    switch (action.type) {
        case AUTH:
            if (action.payload.token) {
                localStorage.setItem('token', JSON.stringify(action.payload.token));
            }
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return { ...state, authData: action.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            localStorage.removeItem('token');
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
