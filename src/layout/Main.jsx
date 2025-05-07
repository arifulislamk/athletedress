import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Main = () => {
    return (
        <div>
            <Navbar />
            <h2 className=' text-4xl text-accent text-center'>Welcome to our website</h2>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;