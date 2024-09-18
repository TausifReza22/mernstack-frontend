// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Footer from './components/Footer';
import ProductCards from './components/ProductCard';
import { FilterProvider } from './components/FilterContext'; // Import FilterProvider

const App = () => {
  return (
    <Router>
      <FilterProvider> {/* Wrap your components with FilterProvider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductCards />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer />
      </FilterProvider>
    </Router>
  );
};



export default App;
