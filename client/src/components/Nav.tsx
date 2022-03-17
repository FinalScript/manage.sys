import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDataState } from '../types/index';
import { LOGOUT } from '../constants/actions';

export const Nav = () => {
    const authData = useSelector((state: AuthDataState) => state.authData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate("/auth");
    };

    return (
        <header className='text-gray-400 bg-gray-900 body-font fixed w-full'>
            <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
                <Link to={'/'} className='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-10 h-10 text-white p-2 bg-pink-500 rounded-full'
                        viewBox='0 0 24 24'>
                        <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
                    </svg>
                    <span className='ml-3 text-xl'>Store Management System</span>
                </Link>
                <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
                    {/* <Link to={'/'} className='mr-5 hover:text-white'>
                        Home
                    </Link> */}
                </nav>
                {authData ? (
                    <>
                        <button
                            onClick={logout}
                            className='inline-flex items-center bg-teal-300 text-black border-0 py-1 px-3 focus:outline-none hover:bg-teal-500 rounded text-base mt-4 md:mt-0'>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to={'/auth'}
                            className='inline-flex items-center bg-teal-300 text-black border-0 py-1 px-3 focus:outline-none hover:bg-teal-500 rounded text-base mt-4 md:mt-0'>
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
            </div>
        </header>
    );
};
