// WeatherInfo.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherInfo({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`);
        setWeather(response.data.current);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();

    // Cleanup function to prevent memory leaks
    return () => {
      setWeather(null);
    };
  }, [city]);

  return (
    <div>
      {weather && (
        <div>
          <h2>Weather Information</h2>
          <p>Temperature: {weather.temp_c}°C</p>
          <p>Condition: {weather.condition.text}</p>
          <img src={weather.condition.icon} alt="Weather icon" />
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
