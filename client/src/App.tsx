import React, { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { useDispatch } from 'react-redux';
import { AUTH, LOGOUT } from './constants/actions';
import { Dashboard } from './pages/Dashboard';
import { AuthData } from './types/index';
import { getAuthData } from './api/index';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const parsedToken = JSON.parse(token);

            getAuthData(parsedToken)
                .then((res) => {
                    dispatch({ type: AUTH, payload: res.data });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            dispatch({ type: LOGOUT });
        }
    }, []);

    return (
        <div>
            <Nav />

            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<div className='h-screen bg-gray-800 text-white pt-20'>Home Page</div>} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
