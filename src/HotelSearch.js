import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function HotelSearch({ destination, budget = 'mid-range' }) {
  const [hotelInfo, setHotelInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(budget);

  const fetchHotelInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_hotels?topic=${destination}&budget=${selectedBudget}`);
      setHotelInfo(response.data);
    } catch (error) {
      console.error('Error fetching hotel info:', error);
      setHotelInfo('Error: Unable to fetch hotel information');
    } finally {
      setLoading(false);
    }
  }, [destination, selectedBudget]);

  useEffect(() => {
    if (destination) {
      fetchHotelInfo();
    }
  }, [destination, selectedBudget, fetchHotelInfo]);

  const displayInfo = (infoSection) => {
    if (!infoSection) return null;
    
    const lines = infoSection.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="hotel-heading">{trimmedLine.slice(4)}</h3>;
      } else if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="hotel-item">
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.length > 0) {
        return (
          <p key={index} className="hotel-details">
            {trimmedLine.replace(/\*/g, '')}
          </p>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="info-box hotels">
      <h2>🏨 Hotel Recommendations</h2>
      <div className="budget-selector">
        <label htmlFor="budget-select">Budget Range:</label>
        <select 
          id="budget-select"
          value={selectedBudget} 
          onChange={(e) => setSelectedBudget(e.target.value)}
          className="budget-dropdown"
        >
          <option value="budget">Budget ($20-80/night)</option>
          <option value="mid-range">Mid-range ($80-200/night)</option>
          <option value="luxury">Luxury ($200+/night)</option>
        </select>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Finding hotels...</p>
        </div>
      ) : (
        <div className="hotel-container">
          {hotelInfo && displayInfo(hotelInfo)}
        </div>
      )}
    </div>
  );
}

export default HotelSearch;