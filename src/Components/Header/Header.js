import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg'
import { AuthContext } from '../UserContext';
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav className='my-nav'>
            <img src={logo} alt="" />
            <div className='my-navi'>
                <Link to="/shop">Shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/about">About</Link>
                {
                    user && user?.uid ?
                        <Link onClick={logOut} >Log Out</Link>
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">SignUp</Link>
                        </>
                }
            </div>

        </nav>
    );
};

export default Header;