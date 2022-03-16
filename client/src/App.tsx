import React from 'react';
import { Nav } from './components/Nav';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Auth } from './pages/Auth';

function App() {
    const location = useLocation();

    return (
        <div>
            <Nav />

            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<div className='h-screen bg-gray-800 text-white pt-20'>Home Page</div>} />
                <Route path='/auth' element={<Auth/>} />
            </Routes>
        </div>
    );
}

export default App;
