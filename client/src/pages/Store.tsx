import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getEmployees } from '../api';
import { EmployeeModal } from '../components/EmployeeModal';
import { DeleteEmployeeModal } from '../components/DeleteEmployeeModal';
import { UpdateEmployeeModal } from '../components/UpdateEmployeeModal';
import { EmployeeData, StoreData } from '../types';

export const Store = () => {
    const location: any = useLocation();
    const [store, setStore] = useState<StoreData>();
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeModal, setEmployeeModal] = useState(true);
    const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(true);
    const [updateEmployeeModal, setUpdateEmployeeModal] = useState(true);
    const [employeeId, setEmployeeId] = useState(0);

    const toggleEmployeeModal = () => {
        setEmployeeModal((prevState) => !prevState);
    };

    const toggleDeleteEmployeeModal = () => {
        setDeleteEmployeeModal((prevState) => !prevState);
    };

    const toggleUpdateEmployeeModal = () => {
        setUpdateEmployeeModal((prevState) => !prevState);
    };

    useEffect(() => {
        if (location.state.store) {
            setStore(location.state.store);
        }
    }, [location.state]);

    useEffect(() => {
        if (store && store.id) {
            document.title = store.name;

            getEmployees(store.id)
                .then((res) => {
                    setEmployeeData(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [store]);

    return (
        <div className='min-h-screen h-full bg-gray-800 text-white pt-20 pb-20 flex flex-col items-center'>
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
            <div className='bg-gray-900 container mt-14 p-7 rounded-xl'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl'>{store?.name}</h1>
                        <button onClick={toggleEmployeeModal} className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-gray-100 p-1 px-2 rounded-lg'>
                            New Employee
                        </button>
                    </div>
                    <div className='py-4'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                </div>
                <div>
                    <div className='flex space-x-2 mb-3 bg-gray-800 rounded-xl cursor-pointer'>
                        <p className='bg-gray-700 rounded-l-xl py-2 w-14 text-center'>ID</p>
                        <p className='rounded-r-xl p-2 w-56 text-center'>Name</p>
                        <p className='bg-gray-700 p-2 w-28 text-center'>Wage</p>
                        <p className='rounded-r-xl p-2 w-20 text-center'>Status</p>
                        <p className='bg-gray-700 p-2 w-44 text-center'>Starting Date</p>
                    </div>

                    {employeeData.map((employee) => {
                        return (
                            <div key={employee.id} className='flex justify-start space-x-2 mb-3 bg-gray-800 w-full rounded-xl cursor-pointer'>
                                <div className='flex justify-start space-x-2 w-full'>
                                    <p className='bg-gray-700 rounded-l-xl py-2 w-14 text-center'>{employee.id}</p>
                                    <p className='rounded-r-xl p-2 w-56 text-center'>{employee.name}</p>
                                    <p className='bg-gray-700 p-2 w-28 text-center'>{employee.wage}</p>
                                    <p className='rounded-r-xl p-2 w-20 text-center'>{employee.status}</p>
                                    <p className='bg-gray-700 p-2 w-44 text-center '>
                                        {employee.startingDate && new Date(employee.startingDate).toDateString()}
                                    </p>
                                </div>
                                <div className='flex items-center space-x-1 ml-auto'>
                                    <button
                                        onClick={() => {
                                            toggleUpdateEmployeeModal();
                                            setEmployeeId(employee.id);
                                        }}
                                        className='bg-green-600 hover:bg-green-800 focus:ring-green-800 text-white text-center p-1 px-3 h-full rounded-l-xl'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            toggleDeleteEmployeeModal();
                                            setEmployeeId(employee.id);
                                        }}
                                        className='bg-red-500 hover:bg-red-800 focus:ring-red-800 text-white text-center p-1 px-3 h-full rounded-r-xl'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
