import { ADD_STORE, ADD_STORES, REMOVE_STORE, REMOVE_STORES, UPDATE_STORE } from '../constants/actions';
import { StoreData } from '../types';

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
            return { ...state, storeData: state.storeData.filter((store: any) => store.id !== action.payload) };
        case UPDATE_STORE:
            const index = state.storeData.findIndex((store: StoreData) => store.id === action.payload.storeId);

            const updateCopy: StoreData[] = [...state.storeData];

            updateCopy[index].name = action.payload.storeName; // Sets the new store name at the store with the given ID

            return { ...state, storeData: updateCopy };
        default:
            return state;
    }
};

export default storeReducer;
