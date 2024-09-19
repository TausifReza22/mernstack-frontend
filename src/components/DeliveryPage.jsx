// src/components/DeliveryPage.js
import React from 'react';
import DeliveryForm from './DeliveryForm';

const DeliveryPage = () => {
  const handleSubmit = (deliveryDetails) => {
    console.log('Delivery Details:', deliveryDetails);
    // You can implement your payment logic here
  };

  return (
    <div>
      <h2>Delivery Information</h2>
      <DeliveryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default DeliveryPage;
