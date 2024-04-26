// Attractions.js
import React from 'react';

function Attractions({ attractions }) {
  return (
    <div className="info-box attractions">
      <h2>Attractions</h2>
      <ul>{attractions}</ul>
    </div>
  );
}

export default Attractions;
