import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function TrainSearch({ destination, departure }) {
  const [trainInfo, setTrainInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTrainInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_trains?topic=${destination}&departure=${departure || 'Your Location'}`);
      setTrainInfo(response.data);
    } catch (error) {
      console.error('Error fetching train info:', error);
      setTrainInfo('Error: Unable to fetch train information');
    } finally {
      setLoading(false);
    }
  }, [destination, departure]);

  useEffect(() => {
    if (destination) {
      fetchTrainInfo();
    }
  }, [destination, departure, fetchTrainInfo]);

  const displayInfo = (infoSection) => {
    if (!infoSection) return null;
    
    const lines = infoSection.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="train-heading">{trimmedLine.slice(4)}</h3>;
      } else if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="train-item">
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.length > 0) {
        return (
          <p key={index} className="train-details">
            {trimmedLine.replace(/\*/g, '')}
          </p>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="info-box trains">
      <h2>🚂 Train Options</h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Searching for trains...</p>
        </div>
      ) : (
        <div className="train-container">
          {trainInfo && displayInfo(trainInfo)}
        </div>
      )}
    </div>
  );
}

export default TrainSearch;