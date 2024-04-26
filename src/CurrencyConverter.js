// CurrencyConverter.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter({ baseCurrency, destinationCurrency }) {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        setExchangeRate(response.data.rates[destinationCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();

    // Cleanup function to prevent memory leaks
    return () => {
      setExchangeRate(null);
    };
  }, [baseCurrency, destinationCurrency]);

  return (
    <div>
      {exchangeRate && (
        <div>
          <h2>Currency Converter</h2>
          <p>1 {baseCurrency} = {exchangeRate} {destinationCurrency}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
