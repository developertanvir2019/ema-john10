import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({ product, handleRemove }) => {
    const { name, price, quantity, img, id } = product;
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="review-details-container">
                <div className="review-details">
                    <p>name : {name}</p>
                    <p>price :{price}</p>
                    <p>quantity : {quantity}</p>

                </div>
                <div className="delete-btn">
                    <button onClick={() => handleRemove(id)}>Delete</button>
                </div>
            </div>

        </div>
    );
};

export default ReviewItem;