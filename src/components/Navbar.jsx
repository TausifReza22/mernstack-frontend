import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons';
import './Navbar.css';
import Login from './Login';
import Signup from './Signup';
import Cart from './Cart';
import Wishlist from './Wishlist';

const Navbar = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user login state
  const [userProfile, setUserProfile] = useState(null); // Store user profile info
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Handle login success
  const handleLoginSuccess = (profile) => {
    setIsAuthenticated(true);
    setUserProfile(profile); // Set the user profile data (mock)
    setShowAuthForm(false);  // Close the login/signup form
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);  // Clear profile data on logout
  };

  const toggleAuthForm = (formType) => {
    setActiveTab(formType);
    setShowAuthForm(true);
  };

  const closeAuthForm = () => setShowAuthForm(false);
  const toggleCart = () => setShowCart(!showCart);
  const toggleWishlist = () => setShowWishlist(!showWishlist);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-section">
            <a href="#" className="nav-link">WOMEN</a>
            <a href="#" className="nav-link">MEN</a>
            <a href="#" className="nav-link">KIDS</a>
            <a href="#" className="nav-link">BRANDS</a>
          </div>
          <div className="navbar-logo">
            <a href="#">HEAVENLY</a>
          </div>
          <div className="navbar-icons">
            <a className="nav-icon" onClick={toggleSearchBar}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
            {showSearchBar && (
              <div className="search-bar-container">
                <input className="search-input" type="text" placeholder="Search..." />
                <button className="search-button">Search</button>
              </div>
            )}
            <a className="nav-icon" onClick={toggleCart}>
              <FontAwesomeIcon icon={faCartShopping} />
            </a>
            <a className="nav-icon" onClick={toggleWishlist}>
              <FontAwesomeIcon icon={faHeart} />
            </a>
            <div className="nav-icon-wrapper">
              {isAuthenticated ? (
                <div className="nav-profile">
                  <span>Welcome, {userProfile?.name || 'User'}</span>
                  <button className="nav-logout" onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <a className="nav-icon" onClick={() => toggleAuthForm('login')}>
                  <FontAwesomeIcon icon={faRegularUser} />
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showCart && <Cart closeCart={toggleCart} />}
      {showWishlist && <Wishlist closeWishlist={toggleWishlist} />}

      {showAuthForm && (
        <div className="auth-overlay" onClick={closeAuthForm}>
          <div className="auth-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeAuthForm}>&times;</button>
            {activeTab === 'login' ? (
              <Login
                switchToSignup={() => toggleAuthForm('signup')}
                onLoginSuccess={handleLoginSuccess} // Pass login success handler
              />
            ) : (
              <Signup
                switchToLogin={() => toggleAuthForm('login')}
                onSignupSuccess={handleLoginSuccess} // Pass signup success handler
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
