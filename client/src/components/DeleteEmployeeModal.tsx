import { useState } from 'react';
import { deleteEmployees } from '../api';

interface Props {
    hidden: boolean;
    toggle: () => void;
    setEmployeeData: Function;
    storeId: number | undefined;
    employeeId: number | undefined;
}

export const DeleteEmployeeModal = ({ hidden, toggle, setEmployeeData, storeId, employeeId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteConfirmed = () => {
        setIsLoading(true);

        if (storeId && employeeId) {
            setTimeout(() => {
                deleteEmployees(storeId, employeeId)
                    .then(() => {
                        setEmployeeData((prevstate: any) => prevstate.filter((data: any) => data.id !== employeeId));

                        toggle();
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }, 1000);
        }
    };
    return (
        <div
            hidden={hidden}
            className='overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-40 fixed z-50 justify-center items-center h-modal md:h-full md:inset-0'>
            <div className='relative px-4 flex flex-col justify-center mx-auto w-full max-w-xl h-full'>
                <div className='relative rounded-lg shadow-xl mb-16 bg-slate-100 dark:bg-slate-900 p-5 flex flex-col space-y-4'>
                    <div className='flex justify-between items-center p-2 pl-5 right-0'>
                        <h1 className='font-medium text-gray-900 dark:text-white text-xl'>Are you sure you want to delete this employee?</h1>
                        <button
                            onClick={toggle}
                            type='button'
                            className='text-gray-900 dark:text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'></path>
                            </svg>
                        </button>
                    </div>
                    <div className='p-2 pl-5'>
                        <button
                            onClick={deleteConfirmed}
                            className='w-full flex justify-center text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800'>
                            {isLoading ? (
                                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                            ) : (
                                'Delete Employee'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
