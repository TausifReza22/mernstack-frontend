// src/contexts/FilterContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const FilterContext = createContext();

// Create the provider component
export const FilterProvider = ({ children }) => {
  const [category, setCategory] = useState('all');

  return (
    <FilterContext.Provider value={{ category, setCategory }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
