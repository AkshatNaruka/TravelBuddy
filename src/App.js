import React, { useState } from 'react';
import axios from 'axios';

import './App.css'; // Import CSS file

function App() {
  const [topic, setTopic] = useState('');
  const [generatedInfo, setGeneratedInfo] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleGenerateInfo = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_travel_info?topic=${topic}`);
      setGeneratedInfo(response.data);
    } catch (error) {
      console.error('Error generating travel info:', error);
      setGeneratedInfo('Error: Unable to generate travel info');
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  const renderInfo = () => {
    return generatedInfo.split('\n').map((line, index) => {
      if (line.endsWith('**')) {
        // Remove double asterisks at the end of the line
        line = line.slice(0, -2);
      }
  
      if (line.startsWith('* **')) {
        // Render subheading
        return <h3 key={index}>{line.slice(4)}</h3>;
      } else if (line.startsWith('**')) {
        // Render heading
        return <h2 key={index}>{line.slice(2)}</h2>;
      } else if (line.startsWith('* ')) {
        // Render bullet point
        return <li key={index}>{line.slice(2)}</li>;
      } else if (line.startsWith('  * ')) {
        // Render sub-bullet point
        return <li key={index}>{line.slice(4)}</li>;
      } else if (line.startsWith('**')) {
        // Render subheading within bullet point
        return <h4 key={index}>{line.slice(2)}</h4>;
      } else {
        // Render paragraph
        return <p key={index}>{line}</p>;
      }
    });
  };
    
  
  
  return (
    <div className="app-container">
      <h1>Travel Buddy</h1>
      <div className="input-container">
        <label htmlFor="topic">Enter Destination:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={handleTopicChange}
        />
        <button onClick={handleGenerateInfo}>Generate Info</button>
      </div>
      <div className="info-container">
        {loading && <div className="loading"></div>} {/* Display loading animation */}
        {generatedInfo && !loading && (
          <div>
            {renderInfo()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
