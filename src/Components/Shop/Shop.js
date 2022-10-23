import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { addToDb, shoppingCartItem } from '../../utilities/fakedb';
import Details from '../Details/Details';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const myProduct = useLoaderData()
    const [cart, setCart] = useState([]);


    useEffect(() => {
        const storedCart = shoppingCartItem();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = myProduct.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);

            }
        }
    }, [myProduct])
    const handleAdCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    myProduct.map(product => <Product key={product.id} product={product} handleAdCart={handleAdCart}></Product>)
                }
            </div>
            <div className="information-container">
                <Details cart={cart}></Details>
            </div>
        </div>
    );
};

export default Shop;