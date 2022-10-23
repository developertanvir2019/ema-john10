import React from 'react';
import './Product.css';

const Product = (props) => {
    // console.log(props.product);
    const { name, seller, price, ratings, img, shipping, stock } = props.product;
    return (
        <div className='single-product'>
            <img src={img} alt="" />
            <div className="product-info">
                <h5>{name}</h5>
                <p>price : ${price}</p>
                <p><small>Seller : {seller}</small></p>
                <p><small> Ratings : {ratings}</small></p>
            </div>
            <button onClick={() => props.handleAdCart(props.product)} className='btn-cart'>
                <p>add to cart</p>
            </button>
        </div>
    );
};

export default Product;