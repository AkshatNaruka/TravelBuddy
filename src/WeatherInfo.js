import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function WeatherInfo({ destination }) {
  const [weatherInfo, setWeatherInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeatherInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_weather?topic=${destination}`);
      setWeatherInfo(response.data);
    } catch (error) {
      console.error('Error fetching weather info:', error);
      setWeatherInfo('Error: Unable to fetch weather information');
    } finally {
      setLoading(false);
    }
  }, [destination]);

  useEffect(() => {
    if (destination) {
      fetchWeatherInfo();
    }
  }, [destination, fetchWeatherInfo]);

  const displayInfo = (infoSection) => {
    if (!infoSection) return null;
    
    const lines = infoSection.split('\n');
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="weather-heading">{trimmedLine.slice(4)}</h3>;
      } else if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="weather-item">
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.length > 0) {
        return (
          <p key={index} className="weather-details">
            {trimmedLine.replace(/\*/g, '')}
          </p>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="info-box weather">
      <h2>🌤️ Weather & Best Time to Visit</h2>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Getting weather info...</p>
        </div>
      ) : (
        <div className="weather-container">
          {weatherInfo && displayInfo(weatherInfo)}
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;