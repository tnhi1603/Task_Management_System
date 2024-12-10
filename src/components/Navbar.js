import { Link } from 'react-router-dom';
import React from 'react';
import { Box } from '@mui/material';


const Navbar = () => {
    return (
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/management">Management</Link>
            <Link to="/notifications">Notifications</Link>
        </nav>
    );
}

export default Navbar;

