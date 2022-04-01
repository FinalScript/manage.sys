import { Store } from 'redux';
import { ADD_STORE, ADD_STORES, REMOVE_STORE, REMOVE_STORES } from '../constants/actions';

const storeReducer = (state: any = { storeData: [] }, action: any) => {
    switch (action.type) {
        case ADD_STORES:
            return { ...state, storeData: action.payload };
        case REMOVE_STORES:
            return { ...state, storeData: [] };
        case ADD_STORE:
            const copy = { ...state };

            copy.storeData.push(action.payload);

            return { ...state, storeData: copy.storeData };
        case REMOVE_STORE:
            return {...state, storeData: state.storeData.filter((store:any) => store.id !== action.payload)};
        default:
            return state;
    }
};

export default storeReducer;
