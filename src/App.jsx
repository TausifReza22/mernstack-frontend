// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Footer from './components/Footer';
import ProductCards from './components/ProductCard';
import DeliveryPage from './components/DeliveryPage'; // Import the DeliveryPage component
import { FilterProvider } from './components/FilterContext'; // Import FilterProvider
import Chatbot from './components/Chatbot'; // Import Chatbot

const App = () => {
  return (
    <Router>
      <FilterProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductCards />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/delivery" element={<DeliveryPage />} /> {/* Add the delivery route */}
        </Routes>
        <Footer />
        <Chatbot />
      </FilterProvider>
    </Router>
  );
};

export default App;
