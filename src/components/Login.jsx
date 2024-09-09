import React, { useState } from 'react';
import './AuthForm.css';

const Login = ({ switchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  
    const profile = { name: 'John Doe', email }; 
    onLoginSuccess(profile); 
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="but" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a onClick={switchToSignup}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;