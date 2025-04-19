import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <h2 className=' text-4xl text-accent text-center'>Welcome to our website</h2>
            <Outlet />
        </div>
    );
};

export default Main;