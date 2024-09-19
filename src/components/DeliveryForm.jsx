import React, { useState } from 'react';
import './DeliveryForm.css'; // Assuming you have a CSS file for styles

const DeliveryForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryDetails = { name, address, city, zip };
    onSubmit(deliveryDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
      <h3>Delivery Information</h3>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ZIP Code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        required
      />
      <div className="form-actions">
        <button type="submit" className="continue-btn">Continue to Payment</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default DeliveryForm;
