import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './UserContext';

const Cart = () => {
    const { user } = useContext(AuthContext)
    console.log(user)
    return (
        <div>
            <h1>{user?.name}</h1>
        </div>
    );
};

export default Cart;