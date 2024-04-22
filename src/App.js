import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [topic, setTopic] = useState('');
  const [generatedInfo, setGeneratedInfo] = useState('');

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleGenerateInfo = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/generate_travel_info?topic=${topic}`);
      setGeneratedInfo(response.data);
    } catch (error) {
      console.error('Error generating travel info:', error);
      setGeneratedInfo('Error: Unable to generate travel info');
    }
  };

  return (
    <div>
      <h1>Travel Information Generator</h1>
      <div>
        <label htmlFor="topic">Enter a topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={handleTopicChange}
        />
        <button onClick={handleGenerateInfo}>Generate Info</button>
      </div>
      <div>
        {generatedInfo && (
          <div>
            <h2>Generated Information:</h2>
            <p>{generatedInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
