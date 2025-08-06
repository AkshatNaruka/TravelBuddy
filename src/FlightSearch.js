import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function FlightSearch({ destination, departure }) {
  const [flightInfo, setFlightInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFlightInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_flights?topic=${destination}&departure=${departure || 'Your Location'}`);
      setFlightInfo(response.data);
    } catch (error) {
      console.error('Error fetching flight info:', error);
      setFlightInfo('Error: Unable to fetch flight information');
    } finally {
      setLoading(false);
    }
  }, [destination, departure]);

  useEffect(() => {
    if (destination) {
      fetchFlightInfo();
    }
  }, [destination, departure, fetchFlightInfo]);

  const displayInfo = (infoSection) => {
    if (!infoSection) return null;
    
    const lines = infoSection.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="flight-heading">{trimmedLine.slice(4)}</h3>;
      } else if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="flight-item">
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.length > 0) {
        return (
          <p key={index} className="flight-details">
            {trimmedLine.replace(/\*/g, '')}
          </p>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="info-box flights">
      <h2>✈️ Flight Options</h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Searching for flights...</p>
        </div>
      ) : (
        <div className="flight-container">
          {flightInfo && displayInfo(flightInfo)}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;