import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteStore } from '../api/index';
import { REMOVE_STORE } from '../constants/actions';

interface Props {
    hidden: boolean;
    toggle: () => void;
    storeId: number | undefined;
}

export const DeleteStoreModal = ({ hidden, toggle, storeId }: Props) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        setForm((prevState) => {
            return { ...prevState, password: '' };
        });
    }, [hidden]);

    const deleteConfirmed = () => {
        setError('');

        if (form.password !== '' && storeId) {
            deleteStore(storeId, {password: form.password})
                .then((res) => {
                    dispatch({ type: REMOVE_STORE, payload: storeId });

                    toggle();
                })
                .catch((err) => {
                    setError(err.response.data.message);
                });
        } else {
            setError('Please enter your password');
        }
    };

    return (
        <div
            hidden={hidden}
            className='overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-40 fixed z-50 justify-center items-center h-modal md:h-full md:inset-0'>
            <div className='relative px-4 flex flex-col justify-center mx-auto w-full max-w-lg h-full'>
                <div className='relative rounded-lg shadow-xl mb-16 bg-slate-900 p-5 flex flex-col space-y-4'>
                    <div className='flex justify-between items-center p-2 pl-5 right-0'>
                        <h1 className='font-medium text-white text-xl'>Are you sure you want to delete this store and all it's employees?</h1>
                        <button
                            onClick={toggle}
                            type='button'
                            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'></path>
                            </svg>
                        </button>
                    </div>
                    <div className='p-2 pl-5'>
                        <label className='flex relative items-center select-none'>
                            <span className='font-medium text-gray-200 mr-3'>Password</span>
                            <div className='relative w-3/4 flex items-center'>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    value={form.password}
                                    onChange={(e) => {
                                        setForm((prevState) => {
                                            return { ...prevState, password: e.target.value };
                                        });
                                    }}
                                    maxLength={100}
                                    className='h-8 w-full border-none outline-none bg-gray-800 text-gray-200 p-2 text-center sm:text-sm rounded-xl'
                                />
                            </div>
                        </label>
                    </div>
                    <p className='text-red-500 text-center text-sm'>{error}</p>
                    <div className='p-2 pl-5'>
                        <button onClick={deleteConfirmed} className='w-full flex justify-center text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800'>
                            Delete Store
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};