import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import UseTitle from '../../UseTitle/UseTitle';
import { addToDb, shoppingCartItem } from '../../utilities/fakedb';
import Details from '../Details/Details';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    UseTitle('Shop')
    // const { products, count } = useLoaderData()
    const [products, setProduct] = useState([])
    const [count, setCount] = useState(0)
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);  //current page ...
    const [size, setSize] = useState(10);
    const pages = Math.ceil(count / size); //total how many page will create
    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        console.log(page, size);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProduct(data.products)
            })
    }, [page, size])


    useEffect(() => {
        const storedCart = shoppingCartItem();
        const savedCart = [];
        const ids = Object.keys(storedCart);
        fetch('http://localhost:5000/productsById', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json)
            .then(data => {

                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id)
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);

                    }
                }
            })
    }, [products])
    const handleAdCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product key={product._id} product={product} handleAdCart={handleAdCart}></Product>)
                }
            </div>
            <div className="information-container">
                <Details cart={cart}></Details>
            </div>


            <div>
                <h4>Now your selected page is :{page}</h4>
                {
                    [...Array(pages).keys()].map(nmbr => <button
                        key={nmbr}
                        className={page === nmbr && 'changeClr'}
                        onClick={() => setPage(nmbr)} >
                        {nmbr + 1} </button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option selected value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;