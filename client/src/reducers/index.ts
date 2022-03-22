import { combineReducers } from 'redux';
import authReducer from './authReducer';
import storeReducer from './storeReducer';

const reducers = combineReducers({ authReducer, storeReducer });

export default reducers;