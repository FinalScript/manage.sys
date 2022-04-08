import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getEmployees } from '../api';
import { EmployeeModal } from '../components/EmployeeModal';
import { DeleteEmployeeModal } from '../components/DeleteEmployeeModal';
import { UpdateEmployeeModal } from '../components/UpdateEmployeeModal';
import { EmployeeData, StoreData } from '../types';
import { Transition } from '@headlessui/react';

export const Store = () => {
    const location: any = useLocation();
    const [store, setStore] = useState<StoreData>();
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeModal, setEmployeeModal] = useState(true);
    const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(true);
    const [updateEmployeeModal, setUpdateEmployeeModal] = useState(true);
    const [employeeId, setEmployeeId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [sortAsc, setSortAsc] = useState(true);

    const toggleEmployeeModal = () => {
        setEmployeeModal((prevState) => !prevState);
    };

    const toggleDeleteEmployeeModal = () => {
        setDeleteEmployeeModal((prevState) => !prevState);
    };

    const toggleUpdateEmployeeModal = () => {
        setUpdateEmployeeModal((prevState) => !prevState);
    };

    const resetSort = () => {
        setSortValue('');
        setSortAsc(true);

        const copy = [...employeeData];

        copy.sort((a, b) => a.id - b.id);

        setEmployeeData(copy);
    };

    useEffect(() => {
        const copy = [...employeeData];

        switch (sortValue) {
            case 'id':
                copy.sort((a, b) => (!sortAsc ? a.id - b.id : b.id - a.id));
                break;
            case 'name':
                copy.sort((a, b) => (!sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
                break;
            case 'wage':
                copy.sort((a, b) => (!sortAsc ? a.wage - b.wage : b.wage - a.wage));
                break;
            case 'status':
                copy.sort((a, b) => {
                    if (a.status === null) {
                        return sortAsc ? -1 : 1;
                    } else if (b.status === null) {
                        return sortAsc ? 1 : -1;
                    }

                    if (!sortAsc) {
                        return a.status?.localeCompare(b ? b.status : '');
                    } else {
                        if (!b.status) {
                            return -10;
                        }
                        return b.status?.localeCompare(a ? a.status : '');
                    }
                });
                break;
            case 'startingDate':
                copy.sort((a, b) => {
                    if (a.startingDate === null) {
                        return sortAsc ? -1 : 1;
                    } else if (b.startingDate === null) {
                        return sortAsc ? 1 : -1;
                    }

                    if (!sortAsc) {
                        return a.startingDate?.localeCompare(b ? b.startingDate : '');
                    } else {
                        if (!b.status) {
                            return -10;
                        }
                        return b.startingDate?.localeCompare(a ? a.startingDate : '');
                    }
                });
                break;
            default:
                break;
        }

        setEmployeeData(copy);
    }, [sortValue, sortAsc]);

    useEffect(() => {
        if (location.state.store) {
            setStore(location.state.store);
        }
    }, [location.state]);

    useEffect(() => {
        if (store && store.id) {
            document.title = store.name + ' | Manage.sys';

            getEmployees(store.id)
                .then((res) => {
                    setEmployeeData(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [store]);

    return (
        <div className='min-h-screen h-full bg-white dark:bg-gray-800 text-white pt-20 pb-20 flex flex-col items-center'>
            <EmployeeModal hidden={employeeModal} toggle={toggleEmployeeModal} setEmployeeData={setEmployeeData} storeId={store?.id} />
            <DeleteEmployeeModal
                hidden={deleteEmployeeModal}
                toggle={toggleDeleteEmployeeModal}
                setEmployeeData={setEmployeeData}
                storeId={store?.id}
                employeeId={employeeId}
            />
            <UpdateEmployeeModal
                hidden={updateEmployeeModal}
                toggle={toggleUpdateEmployeeModal}
                setEmployeeData={setEmployeeData}
                storeId={store?.id}
                employeeId={employeeId}
            />
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
                <div className='bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-7 rounded-xl'>
                    <div>
                        <div className='flex justify-between'>
                            <h1 className='text-3xl'>{store?.name}</h1>
                            <button
                                onClick={toggleEmployeeModal}
                                className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-gray-100 p-1 px-2 rounded-lg'>
                                New Employee
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
                                        placeholder='Search employees by id or name'
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                        }}
                                    />
                                </div>
                                {sortValue && (
                                    <div className='ml-10 h-fit text-xs flex justify-center items-center rounded-lg'>
                                        <div className='flex cursor-pointer select-none' onClick={() => setSortAsc((prevState) => !prevState)}>
                                            <p className='bg-gray-800 h-full rounded-l-lg flex items-center px-4 py-2'>Sorting by</p>
                                            <p className='bg-gray-700 h-full flex items-center pl-4 pr-3 py-2'>{sortValue.toUpperCase()}</p>
                                            <p className='bg-gray-700 text-gray-300 rounded-r-lg h-full flex items-center pr-3 pl-1 py-2'>
                                                <span className='h-4'>
                                                    {sortAsc ? (
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='currentColor'
                                                            width='100%'
                                                            height='100%'
                                                            viewBox='0 0 24 24'>
                                                            <path d='M6 21l6-8h-4v-10h-4v10h-4l6 8zm16-12h-8v-2h8v2zm2-6h-10v2h10v-2zm-4 8h-6v2h6v-2zm-2 4h-4v2h4v-2zm-2 4h-2v2h2v-2z' />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='currentColor'
                                                            width='100%'
                                                            height='100%'
                                                            viewBox='0 0 24 24'>
                                                            <path d='M6 3l-6 8h4v10h4v-10h4l-6-8zm16 14h-8v-2h8v2zm2 2h-10v2h10v-2zm-4-8h-6v2h6v-2zm-2-4h-4v2h4v-2zm-2-4h-2v2h2v-2z' />
                                                        </svg>
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                        <p className='ml-5 bg-gray-800 h-full rounded-lg flex items-center px-3 py-2 cursor-pointer' onClick={resetSort}>
                                            <span className='h-4 text-red-600'>
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
                                            </span>
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
                                            <th
                                                scope='col'
                                                className='px-6 py-3 select-none cursor-pointer'
                                                onClick={() => {
                                                    if (sortValue === 'wage') {
                                                        setSortAsc((prevState) => !prevState);
                                                    } else {
                                                        setSortValue('wage');
                                                    }
                                                }}>
                                                Wage
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-6 py-3 select-none cursor-pointer'
                                                onClick={() => {
                                                    if (sortValue === 'status') {
                                                        setSortAsc((prevState) => !prevState);
                                                    } else {
                                                        setSortValue('status');
                                                    }
                                                }}>
                                                Status
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-6 py-3 select-none cursor-pointer'
                                                onClick={() => {
                                                    if (sortValue === 'startingDate') {
                                                        setSortAsc((prevState) => !prevState);
                                                    } else {
                                                        setSortValue('startingDate');
                                                    }
                                                }}>
                                                Starting Date
                                            </th>
                                            <th scope='col' className='px-6 py-3 select-none cursor-pointer'>
                                                <span className='sr-only'>Options</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeData.map((employee) => {
                                            return (
                                                <tr
                                                    hidden={
                                                        !(
                                                            searchValue === '' ||
                                                            employee.name.toLowerCase().search(searchValue.toLowerCase()) === 0 ||
                                                            employee.id.toString().toLowerCase().search(searchValue.toLowerCase()) === 0
                                                        )
                                                    }
                                                    key={employee.id}
                                                    className='bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
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
                                                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                                                        {employee.id}
                                                    </th>
                                                    <td className='px-6 py-4 text-gray-900 dark:text-white'>{employee.name}</td>
                                                    <td className='px-6 py-4 text-gray-900 dark:text-white'>{employee.wage}</td>
                                                    <td className='px-6 py-4 text-gray-900 dark:text-white'>{employee.status}</td>
                                                    <td className='px-6 py-4 text-gray-900 dark:text-white'>
                                                        {employee.startingDate && new Date(employee.startingDate).toDateString()}
                                                    </td>
                                                    <td className='px-6 py-4 text-gray-900 dark:text-white text-right'>
                                                        <button
                                                            onClick={() => {
                                                                toggleUpdateEmployeeModal();
                                                                setEmployeeId(employee.id);
                                                            }}
                                                            className='font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline'>
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                toggleDeleteEmployeeModal();
                                                                setEmployeeId(employee.id);
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
