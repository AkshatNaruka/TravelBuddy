// TravelTips.js
import React from 'react';

function TravelTips({ travelTips }) {
  return (
    <div className="info-box travel-tips">
      <h2>Travel Tips</h2>
      <ul>{travelTips}</ul>
    </div>
  );
}

export default TravelTips;
