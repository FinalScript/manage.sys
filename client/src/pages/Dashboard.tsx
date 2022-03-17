import React, { useState } from 'react';
import { NewStoreModal } from '../components/NewStoreModal';

export const Dashboard = () => {
    const [newStoreModalHidden, setNewStoreModalHidden] = useState(true);

    const toggleNewStoreModal = () => {
        setNewStoreModalHidden((prevState) => !prevState);
    };

    return (
        <div className='h-screen bg-gray-800 text-white pt-20 flex flex-col items-center'>
            <NewStoreModal hidden={newStoreModalHidden} toggle={toggleNewStoreModal} />
            <div className='bg-gray-900 container mt-14 p-7 rounded-xl'>
                <div>
                    <div className='flex justify-between'>
                        <h1 className='text-3xl'>Stores</h1>
                        <button onClick={toggleNewStoreModal} className='bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-gray-100 p-1 px-2 rounded-lg'>New Store</button>
                    </div>
                    <div className='py-4'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
