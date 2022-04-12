import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDataState } from '../types/index';
import { LOGOUT } from '../constants/actions';
import logoImg from '../assets/images/logo.png';
import ToggleDarkMode from './ToggleDarkMode';

export const Nav = () => {
    const authData = useSelector((state: AuthDataState) => state.authReducer.authData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [didScroll, setDidScroll] = useState(false);
    const scrolledNavStyles = 'dark:bg-gray-900 bg-gray-100 px-5 p-3 rounded-xl shadow-lg';
    const defaultNavStyles = ' ';

    useEffect(() => {
        document.addEventListener('scroll', () => {
            setDidScroll(window.scrollY > 70);
        });

        return () => {
            document.removeEventListener('scroll', () => {
                setDidScroll(window.scrollY > 70);
            });
        };
    }, []);

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/auth');
    };

    return (
        <header className={'text-gray-500 dark:text-gray-400 w-full body-font fixed bg-transparent transition-transform duration-200 z-10'}>
            <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
                <Link to={'/'} className={'flex title-font font-medium items-center text-white transition-all mb-4 md:mb-0 ' + (didScroll ? 'opacity-0' : ' ')}>
                    <div className='relative w-16 flex justify-center items-center'>
                        <img className='object-contain absolute' src={logoImg} alt='logo' />
                    </div>
                    <span className='ml-3 text-3xl app-title font-bold text-gray-900 dark:text-gray-100'>
                        MANAGE.sys
                    </span>
                </Link>
                <nav className={'md:ml-auto flex flex-wrap items-center transition-all text-base justify-center ' + (didScroll ? scrolledNavStyles : defaultNavStyles)}>
                    <div className='mr-6'>
                        <ToggleDarkMode />
                    </div>
                    {authData ? (
                        <>
                            <Link to={'/dashboard'} className='mr-6 hover:text-gray-900 dark:hover:text-white'>
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className='inline-flex items-center bg-pink-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-pink-700 rounded text-base md:mt-0'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to={'/auth'}
                                className='inline-flex items-center bg-pink-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-pink-800 rounded text-base md:mt-0'>
                                Sign Up
                                <svg
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    className='w-4 h-4 ml-1'
                                    viewBox='0 0 24 24'>
                                    <path d='M5 12h14M12 5l7 7-7 7'></path>
                                </svg>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};
