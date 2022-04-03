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

    const newDate = (employee:any) => {
        const date =employee.startingDate.split('T') 
        return date[0];
    }

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
                employeeData={employeeData}
            />
            <UpdateEmployeeModal
                hidden={updateEmployeeModal}
                toggle={toggleUpdateEmployeeModal}
                setEmployeeData={setEmployeeData}
                storeId={store?.id}
                employeeId={employeeId}
                employeeData={employeeData}
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
                    {employeeData.map((employee) => {
                        return (
                            <div key={employee.id} className='flex space-x-2 mb-3 bg-gray-800 rounded-xl cursor-pointer'>
                                <p className='bg-gray-700 rounded-l-xl py-2 w-12 text-center'>{employee.id}</p>
                                <p className='rounded-r-xl p-2 w-20'>{employee.name}</p>
                                <p className='rounded-r-xl p-2 w-20'>{employee.wage}</p>
                                <p className='rounded-r-xl p-2 w-20'>{employee.status}</p>
                                <p className='rounded-r-xl p-2 w-full'>{newDate(employee)}</p>
                                <button
                                   onClick={() => {
                                    toggleUpdateEmployeeModal();
                                    setEmployeeId(employee.id);
                                }}
                                    className='bg-blue-700 hover:bg-blue-800 focus:ring-blue-800 text-gray-100 p-1 px-2 rounded-lg '>
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        toggleDeleteEmployeeModal();
                                        setEmployeeId(employee.id);
                                    }}
                                    className='bg-red-700 hover:bg-red-800 focus:ring-red-800 text-gray-100 p-1 px-2 rounded-lg'>
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
