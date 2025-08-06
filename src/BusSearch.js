import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function BusSearch({ destination, departure }) {
  const [busInfo, setBusInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBusInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_buses?topic=${destination}&departure=${departure || 'Your Location'}`);
      setBusInfo(response.data);
    } catch (error) {
      console.error('Error fetching bus info:', error);
      setBusInfo('Error: Unable to fetch bus information');
    } finally {
      setLoading(false);
    }
  }, [destination, departure]);

  useEffect(() => {
    if (destination) {
      fetchBusInfo();
    }
  }, [destination, departure, fetchBusInfo]);

  const displayInfo = (infoSection) => {
    if (!infoSection) return null;
    
    const lines = infoSection.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="bus-heading">{trimmedLine.slice(4)}</h3>;
      } else if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="bus-item">
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.length > 0) {
        return (
          <p key={index} className="bus-details">
            {trimmedLine.replace(/\*/g, '')}
          </p>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="info-box buses">
      <h2>🚌 Bus Options</h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Searching for buses...</p>
        </div>
      ) : (
        <div className="bus-container">
          {busInfo && displayInfo(busInfo)}
        </div>
      )}
    </div>
  );
}

export default BusSearch;