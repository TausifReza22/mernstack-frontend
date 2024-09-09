import React from 'react';
import './Wishlist.css';

const Wishlist = ({ closeWishlist }) => {
    return (
        <div className="wishlist-overlay" onClick={closeWishlist}>
            <div className="wishlist-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-wishlist" onClick={closeWishlist}>&times;</button>
                <h2>My Wishlist</h2>
                <div className="wishlist-items">
                    <p>No items in your wishlist yet.</p>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;