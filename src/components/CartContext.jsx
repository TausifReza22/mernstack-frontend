import React, { createContext, useState, useContext } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext in components
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap your app and manage cart state globally
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      // Update quantity if the product already exists
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product to the cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of the cart
  const totalCartPrice = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        totalCartPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
