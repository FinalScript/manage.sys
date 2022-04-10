import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteStoreModal } from '../components/DeleteStoreModal';
import { NewStoreModal } from '../components/NewStoreModal';
import { UpdateStoreModal } from '../components/UpdateStoreModal';
import { StoreDataState } from '../types';
import { Transition } from '@headlessui/react';

export const Dashboard = () => {
    const storeData = useSelector((state: StoreDataState) => state.storeReducer.storeData);
    //const [modalHidden, setModalHidden] = useState({ newStore: true, deleteStore: true, updateStore: true })
    const [newStoreModalHidden, setNewStoreModalHidden] = useState(true);
    const [deleteStoreModalHidden, setDeleteStoreModalHidden] = useState(true);
    const [updateStoreModalHidden, setUpdateStoreModalHidden] = useState(true);
    const [storeId, setStoreId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const navigate = useNavigate();

    const toggleNewStoreModal = () => {
        setNewStoreModalHidden((prevState) => !prevState);
    };

    const toggleDeleteStoreModal = () => {
        setDeleteStoreModalHidden((prevState) => !prevState);
    };

    const toggleUpdateStoreModal = () => {
        setUpdateStoreModalHidden((prevState) => !prevState);
    };

    const resetSort = () => {
        setSortValue('');
        setSortAsc(true);

        const copy = [...storeData];

        copy.sort((a, b) => a.id - b.id);

        // setEmployeeData(copy);
    };

    useEffect(() => {
        const copy = [...storeData];

        switch (sortValue) {
            case 'id':
                copy.sort((a, b) => (!sortAsc ? a.id - b.id : b.id - a.id));
                break;
            case 'name':
                copy.sort((a, b) => (!sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
                break;

            default:
                break;
        }

        // setEmployeeData(copy);
    }, [sortValue, sortAsc]);

    useEffect(() => {
        document.title = 'Dashboard | Manage.sys';
    }, []);

    return (
        <div className='min-h-screen h-full bg-white dark:bg-gray-800 text-white pt-20 pb-20 flex flex-col items-center'>
            <NewStoreModal hidden={newStoreModalHidden} toggle={toggleNewStoreModal} />
            <UpdateStoreModal hidden={updateStoreModalHidden} toggle={toggleUpdateStoreModal} storeId={storeId} />
            <DeleteStoreModal hidden={deleteStoreModalHidden} toggle={toggleDeleteStoreModal} storeId={storeId} />
            <Transition
                appear={true}
                show={true}
                enter='transition-opacity duration-1000'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-150'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className={'transition-all container mt-14'}>
            <div className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white container p-7 rounded-xl'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl'>My Stores</h1>
                        <button onClick={toggleNewStoreModal} className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-gray-100 p-1 px-2 rounded-lg'>
                            New Store
                        </button>
                    </div>
                    <div className='pt-4'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                </div>
                <div>
                    <div className='relative overflow-x-auto rounded-lg'>
                        <div className='py-4 flex items-center'>
                            <div className='relative mt-1'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <svg
                                        className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                        fill='currentColor'
                                        viewBox='0 0 20 20'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            fill-rule='evenodd'
                                            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                            clip-rule='evenodd'></path>
                                    </svg>
                                </div>
                                <input
                                    type='text'
                                    id='table-search'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='Search store by id or name'
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                            </div>
                            {sortValue && (
                                <div className='ml-10 h-fit text-xs flex justify-center items-center rounded-lg'>
                                    <div className='flex cursor-pointer select-none' onClick={() => setSortAsc((prevState) => !prevState)}>
                                        <p className='bg-gray-300 dark:bg-gray-800 h-full rounded-l-lg flex items-center px-4 py-2'>Sorting by</p>
                                        <p className='bg-gray-200 dark:bg-gray-700 h-full flex items-center pl-4 pr-3 py-2'>{sortValue.toUpperCase()}</p>
                                        <p className='bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r-lg h-full flex items-center pr-3 pl-1 py-2'>
                                            <div className='h-4'>
                                                {sortAsc ? (
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' width='100%' height='100%' viewBox='0 0 24 24'>
                                                        <path d='M6 21l6-8h-4v-10h-4v10h-4l6 8zm16-12h-8v-2h8v2zm2-6h-10v2h10v-2zm-4 8h-6v2h6v-2zm-2 4h-4v2h4v-2zm-2 4h-2v2h2v-2z' />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' width='100%' height='100%' viewBox='0 0 24 24'>
                                                        <path d='M6 3l-6 8h4v10h4v-10h4l-6-8zm16 14h-8v-2h8v2zm2 2h-10v2h10v-2zm-4-8h-6v2h6v-2zm-2-4h-4v2h4v-2zm-2-4h-2v2h2v-2z' />
                                                    </svg>
                                                )}
                                            </div>
                                        </p>
                                    </div>
                                    <p className='ml-5 bg-gray-300 dark:bg-gray-800 h-full rounded-lg flex items-center px-3 py-2 cursor-pointer' onClick={resetSort}>
                                        <div className='h-4 text-red-600'>
                                            <svg
                                                fill='currentColor'
                                                width='100%'
                                                height='100%'
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                fill-rule='evenodd'
                                                clip-rule='evenodd'>
                                                <path d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z' />
                                            </svg>
                                        </div>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        {/* <th scope='col' className='p-4'>
                                            <div className='flex items-center'>
                                                <input
                                                    id='checkbox-all-search'
                                                    type='checkbox'
                                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                />
                                                <label htmlFor='checkbox-all-search' className='sr-only'>
                                                    checkbox
                                                </label>
                                            </div>
                                        </th> */}
                                        <th
                                            scope='col'
                                            className='px-6 py-3 select-none cursor-pointer'
                                            onClick={() => {
                                                if (sortValue === 'id') {
                                                    setSortAsc((prevState) => !prevState);
                                                } else {
                                                    setSortValue('id');
                                                }
                                            }}>
                                            ID
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 select-none cursor-pointer'
                                            onClick={() => {
                                                if (sortValue === 'name') {
                                                    setSortAsc((prevState) => !prevState);
                                                } else {
                                                    setSortValue('name');
                                                }
                                            }}>
                                            Name
                                        </th>

                                        <th scope='col' className='px-6 py-3 select-none cursor-pointer'>
                                            <span className='sr-only'>Options</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeData.map((store) => {
                                        return (
                                            <tr
                                                hidden={
                                                    !(
                                                        searchValue === '' ||
                                                        store.name.toLowerCase().search(searchValue.toLowerCase()) === 0 ||
                                                        store.id.toString().toLowerCase().search(searchValue.toLowerCase()) === 0
                                                    )
                                                }
                                                key={store.id}
                                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                                {/* <td className='w-4 p-4'>
                                                    <div className='flex items-center'>
                                                        <input
                                                            id='checkbox-table-search-1'
                                                            type='checkbox'
                                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                        />
                                                        <label htmlFor='checkbox-table-search-1' className='sr-only'>
                                                            checkbox
                                                        </label>
                                                    </div>
                                                </td> */}
                                                <th
                                                    scope='row'
                                                    className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap cursor-pointer'
                                                    onClick={() => {
                                                        navigate('store/' + store.id + '/', { state: { store } });
                                                    }}>
                                                    {store.id}
                                                </th>
                                                <td
                                                    className='px-6 py-4 text-gray-900 dark:text-white cursor-pointer'
                                                    onClick={() => {
                                                        navigate('store/' + store.id + '/', { state: { store } });
                                                    }}>
                                                    {store.name}
                                                </td>
                                                <td className='px-6 py-4 text-gray-900 dark:text-white text-right'>
                                                    <button
                                                        onClick={() => {
                                                            toggleUpdateStoreModal();
                                                            setStoreId(store.id);
                                                        }}
                                                        className='font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline'>
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            toggleDeleteStoreModal();
                                                            setStoreId(store.id);
                                                        }}
                                                        className='font-medium ml-5 text-red-600 dark:text-red-500 hover:underline'>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </Transition>
        </div>
    );
};
