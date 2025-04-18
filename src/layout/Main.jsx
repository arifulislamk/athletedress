import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h2 className=' text-4xl text-accent text-center'>Welcome to our website</h2>
            <Outlet />
        </div>
    );
};

export default Main;