import React, { useEffect, useState } from 'react';
import { register, login, setBearerToken } from '../api/index';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../constants/actions';
import { Link } from 'react-router-dom';
import { AuthDataState } from '../types/index';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const authData = useSelector((state: AuthDataState) => state.authReducer.authData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(true);
    const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Auth | Manage.sys';
    }, []);

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
        setIsLoading(true);
        setError('');

        if (isRegistering) {
            setTimeout(() => {
                register({ username: form.username, password: form.password })
                    .then((res) => {
                        dispatch({ type: AUTH, payload: res.data });

                        if (res.data.token) {
                            setBearerToken(res.data.token);
                        }

                        navigate('/dashboard');
                    })
                    .catch((err) => setError(err.response.data.message))
                    .finally(() => {
                        setIsLoading(false);
                    });
            }, 1000);
        } else {
            setTimeout(() => {
                login({ username: form.username, password: form.password })
                    .then((res) => {
                        dispatch({ type: AUTH, payload: res.data });

                        if (res.data.token) {
                            setBearerToken(res.data.token);
                        }

                        navigate('/dashboard');
                    })
                    .catch((err) => setError(err.response.data.message))
                    .finally(() => {
                        setIsLoading(false);
                    });
            }, 1000);
        }
    };

    return (
        <div className='bg-white dark:bg-gray-800 text-white h-screen flex justify-center items-center'>
            <div className='w-authContainer bg-gray-100 rounded-lg p-6 flex flex-col mt-10 md:mt-0'>
                {authData ? (
                    <div className='flex flex-col items-center space-y-4'>
                        <h2 className='text-gray-600 text-2xl font-normal title-font text-center'>You're logged in!</h2>
                        <Link
                            to={'/dashboard'}
                            className='inline-flex items-center w-fit bg-pink-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-base md:mt-0'>
                            View Dashboard
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        submitForm();
                    }}>
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
                            className='flex w-full justify-center items-center text-white h-12 bg-pink-500 border-0 py-2 px-8 mt-5 focus:outline-none hover:bg-pink-600 rounded text-lg'
                            onClick={submitForm}>
                            {isLoading ? (
                                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                            ) : isRegistering ? (
                                'Sign Up'
                            ) : (
                                'Login'
                            )}
                        </button>
                        <div className='text-gray-900 pt-5 text-center select-none'>
                            <p className='cursor-pointer' onClick={switchRegistrationMode}>
                                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <span className='text-pink-500 font-semibold'>{isRegistering ? 'Login' : 'Register'}</span>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
