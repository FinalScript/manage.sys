import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedComponent = ({ component: Component }: any) => {
    const [profile] = useState(JSON.parse(localStorage.getItem('profile') || '{}'));

    return (
        <>
            {profile.id ? (
                <>{Component}</>
            ) : (
                <Navigate
                    to={{
                        pathname: '/auth',
                    }}
                />
            )}
        </>
    );
};
