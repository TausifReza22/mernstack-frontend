import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ closeCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Fetch cart items from localStorage when component mounts
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleIncrement = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = cartItems.map(item =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handlePlaceOrder = () => {
    setShowPaymentModal(true); // Show payment modal
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false); // Close payment modal
  };

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-cart" onClick={closeCart}>&times;</button>
        <h2>My Cart</h2>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>No items in your cart yet.</p>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image[0]} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="decrement-btn"
                    onClick={() => handleDecrement(item._id)}
                  >
                    -
                  </button>
                  <button
                    className="increment-btn"
                    onClick={() => handleIncrement(item._id)}
                  >
                    +
                  </button>
                  <button
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Place Order Button */}
        {cartItems.length > 0 && (
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="payment-overlay">
            <div className="payment-modal">
              <h2>Payment Options</h2>
              {/* Add your payment options here */}
              <button onClick={closePaymentModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
