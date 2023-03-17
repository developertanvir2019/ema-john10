import React from 'react';
import { Link } from 'react-router-dom';
import UseTitle from '../../UseTitle/UseTitle';
import "./Details.css"

const Details = ({ cart }) => {
    UseTitle('Details')
    let total = 0;
    let totalShipping = 0;
    let quantity = 0;

    for (const cartItem of cart) {
        quantity = quantity + cartItem.quantity;
        total = total + cartItem.price * cartItem.quantity;
        totalShipping = totalShipping + cartItem.shipping;
    }
    let tax = (total * 0.1).toFixed(2);
    let grandTotal = parseInt(total) + parseInt(totalShipping) + parseInt(tax);
    return (
        <div className='sticky'>
            <h3>All information</h3>
            <h5>Total added: {quantity} </h5>
            <p>Total price : ${total}</p>
            <p>total shipping : ${totalShipping}</p>
            <p>Tax : ${tax}</p>
            <h5>Grand Total : ${grandTotal}</h5>
            <Link to='/shipping'><button>Shipping Order</button></Link>
        </div>
    );
};

export default Details;