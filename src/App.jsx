import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
