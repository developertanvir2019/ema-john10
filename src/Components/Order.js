import React from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../utilities/fakedb';
import Details from './Details/Details';
import ReviewItem from './ReviewItem/ReviewItem';

const Order = () => {
    const { products, initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    const handleRemove = (id) => {
        const remaining = cart.filter(item => item.id !== id);
        setCart(remaining);
        removeFromDb(id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    cart.map(product =>
                        <ReviewItem
                            key={product.id}
                            product={product}
                            handleRemove={handleRemove}
                        >
                        </ReviewItem>)
                }

            </div>
            <div className="information-container">
                <Details cart={cart}></Details>
            </div>

        </div>
    );
};

export default Order;