import React, { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_STORES, AUTH, LOGOUT, REMOVE_STORES } from './constants/actions';
import { Dashboard } from './pages/Dashboard';
import { getAuthData, getStores, setBearerToken } from './api/index';
import { ProtectedComponent } from './components/ProtectedComponent';
import { useSafeLocalStorage } from './hooks/useSafeLocalStorage';
import { AuthDataState } from './types';
import { Store } from './pages/Store';
import { Home } from './pages/Home';

function App() {
    const authData = useSelector((state: AuthDataState) => state.authReducer.authData);
    const location = useLocation();
    const dispatch = useDispatch();
    const [token] = useSafeLocalStorage('token', '');

    useEffect(() => {
        if (token) {
            setBearerToken(token);

            getAuthData()
                .then((res) => {
                    dispatch({ type: AUTH, payload: res.data });
                })
                .catch((err) => {
                    dispatch({ type: LOGOUT });
                });
        } else {
            dispatch({ type: LOGOUT });
        }
    }, []);

    useEffect(() => {
        if (authData) {
            getStores().then((storeres) => {
                dispatch({ type: ADD_STORES, payload: storeres.data });
            });
        } else {
            dispatch({ type: REMOVE_STORES });
        }
    }, [authData]);

    return (
        <div>
            <Nav />

            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/dashboard' element={<ProtectedComponent component={<Dashboard />} />} />
                <Route path='/dashboard/store/:storeId/' element={<ProtectedComponent component={<Store />} />} />
            </Routes>
        </div>
    );
}

export default App;
