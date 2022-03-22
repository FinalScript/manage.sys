import React, { useEffect, useState } from 'react';
import { register, login, setBearerToken } from '../api/index';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../constants/actions';
import { Link } from 'react-router-dom';
import { AuthDataState } from '../types/index';

export const Auth = () => {
    const authData = useSelector((state: AuthDataState) => state.authReducer.authData);
    const dispatch = useDispatch();
    const [isRegistering, setIsRegistering] = useState(true);
    const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (form.password !== form.confirmPassword && isRegistering) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }, [form.password, form.confirmPassword]);

    const switchRegistrationMode = () => {
        setIsRegistering((prevState) => !prevState);
    };

    const submitForm = () => {
        setError('');

        if (isRegistering) {
            register({ username: form.username, password: form.password })
                .then((res) => {
                    dispatch({ type: AUTH, payload: res.data });
              
                    if (res.data.token) {
                        setBearerToken(res.data.token);
                    }
                })
                .catch((err) => setError(err.response.data.message));
        } else {
            login({ username: form.username, password: form.password })
                .then((res) => {
                    dispatch({ type: AUTH, payload: res.data });
                   
                    if (res.data.token) {
                        setBearerToken(res.data.token);
                    }
                })
                .catch((err) => setError(err.response.data.message));
        }
    };

    return (
        <div className='bg-gray-800 text-white h-screen flex justify-center items-center'>
            <div className='w-authContainer bg-gray-100 rounded-lg p-6 flex flex-col mt-10 md:mt-0'>
                {authData ? (
                    <div className='flex flex-col items-center space-y-4'>
                        <h2 className='text-gray-600 text-2xl font-normal title-font text-center'>You're logged in!</h2>
                        <Link
                            to={'/dashboard'}
                            className='inline-flex items-center w-fit bg-pink-500 text-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base md:mt-0'>
                            View Dashboard
                        </Link>
                    </div>
                ) : (
                    <>
                        <h2 className='text-gray-900 text-lg font-medium title-font mb-5 text-center'>{isRegistering ? 'Admin Sign Up' : 'Admin Sign In'}</h2>
                        <div className='relative mb-4'>
                            <label htmlFor='full-name' className='leading-7 text-sm text-gray-600'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='full-name'
                                name='full-name'
                                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                value={form.username}
                                onChange={(e) => {
                                    setForm((prevState) => {
                                        return { ...prevState, username: e.target.value };
                                    });
                                }}
                            />
                        </div>
                        <div className='relative mb-4'>
                            <label htmlFor='password' className='leading-7 text-sm text-gray-600'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                value={form.password}
                                onChange={(e) => {
                                    setForm((prevState) => {
                                        return { ...prevState, password: e.target.value };
                                    });
                                }}
                            />
                        </div>
                        <div className={'relative mb-4' + (isRegistering ? '' : ' hidden')}>
                            <label htmlFor='confirmPassword' className='leading-7 text-sm text-gray-600'>
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                value={form.confirmPassword}
                                onChange={(e) => {
                                    setForm((prevState) => {
                                        return { ...prevState, confirmPassword: e.target.value };
                                    });
                                }}
                            />
                        </div>
                        <div className='relative'>
                            <p className='text-red-500 text-center text-sm'>{error}</p>
                        </div>
                        <button
                            className='text-white bg-indigo-500 border-0 py-2 px-8 mt-5 focus:outline-none hover:bg-indigo-600 rounded text-lg'
                            onClick={submitForm}>
                            {isRegistering ? 'Sign Up' : 'Login'}
                        </button>
                        <div className='text-gray-900 pt-5 text-center cursor-pointer select-none' onClick={switchRegistrationMode}>
                            <p>
                                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <span className='text-indigo-500 font-semibold'>{isRegistering ? 'Login' : 'Register'}</span>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
