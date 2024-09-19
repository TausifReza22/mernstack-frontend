import React from 'react';
import './Cart.css';

const Cart = ({ closeCart }) => {
  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-cart" onClick={closeCart}>&times;</button>
        <h2>My Cart</h2>
        <div className="cart-items">
          <p>No items in your cart yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;