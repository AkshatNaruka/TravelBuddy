// Itinerary.js
import React from 'react';

function Itinerary({ itinerary }) {
  return (
    <div className="info-box itinerary">
      <h2>Itinerary</h2>
      <div className="itinerary-container">{itinerary}</div>
    </div>
  );
}

export default Itinerary;
