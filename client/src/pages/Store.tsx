import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getEmployees } from '../api';
import { EmployeeModal } from '../components/EmployeeModal';
import { EmployeeData, StoreData } from '../types';

export const Store = () => {
    const location: any = useLocation();
    const [store, setStore] = useState<StoreData>();
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeModal, setEmployeModal] = useState(true);

    const toggleEmployeeModal = () => {
        setEmployeModal((prevState) => !prevState);
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
                                <p className='rounded-r-xl p-2'>{employee.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
