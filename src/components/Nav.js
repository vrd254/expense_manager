import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CssFiles/Nav.css";
const Nav = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='nav-bar'>
            <div className='logo'>
                <a href='#'>Expense Tracker</a>
            </div>
            <ul>
                <li><a onClick={() => handleNavigation('/dashboard')}>Home</a></li>
                <li><a onClick={() => handleNavigation('/groups')}>Expenses</a></li>
                <li><a onClick={() => handleNavigation('/')}>Logout</a></li>
            </ul>
        </div>
    );
}

export default Nav;
