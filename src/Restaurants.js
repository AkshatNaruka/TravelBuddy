// Restaurants.js
import React from 'react';

function Restaurants({ restaurants }) {
  return (
    <div className="info-box restaurants">
      <h2>Restaurants</h2>
      <ul>{restaurants}</ul>
    </div>
  );
}

export default Restaurants;
