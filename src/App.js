import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file
import renderInfo from './renderInfo';

function App() {
  const [topic, setTopic] = useState('');
  const [generatedInfo, setGeneratedInfo] = useState({
    attractions: '',
    restaurants: '',
    activities: '',
    travelTips: ''
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleGenerateInfo = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const attractionsResponse = await axios.get(`http://127.0.0.1:5000/generate_attractions_info?topic=${topic}`);
      const restaurantsResponse = await axios.get(`http://127.0.0.1:5000/generate_restaurants_info?topic=${topic}`);
      const activitiesResponse = await axios.get(`http://127.0.0.1:5000/generate_activities_info?topic=${topic}`);
      const travelTipsResponse = await axios.get(`http://127.0.0.1:5000/generate_travel_tips?topic=${topic}`);

      setGeneratedInfo({
        attractions: attractionsResponse.data,
        restaurants: restaurantsResponse.data,
        activities: activitiesResponse.data,
        travelTips: travelTipsResponse.data
      });
    } catch (error) {
      console.error('Error generating travel info:', error);
      setGeneratedInfo({
        attractions: 'Error: Unable to generate attractions info',
        restaurants: 'Error: Unable to generate restaurants info',
        activities: 'Error: Unable to generate activities info',
        travelTips: 'Error: Unable to generate travel tips'
      });
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  const removeAsterisks = (text) => {
    // Enhanced regular expression to handle multiple asterisks within text
    return text.replace(/\*/g, ''); // Replaces occurrences of two or more consecutive asterisks
  };

  const displayInfo = (infoSection) => {
    const processedInfo = renderInfo(infoSection, true);
    // Ensure leading/trailing asterisks are removed from processed elements
    if (processedInfo.length > 0 && processedInfo[0].props.children.startsWith('*')) {
      processedInfo.shift();
    }
    if (processedInfo.length > 0 && processedInfo[processedInfo.length - 1].props.children.endsWith('*')) {
      processedInfo.pop();
    }
    // Remove all remaining asterisks within paragraphs or descriptions
    return processedInfo.map((element) => {
      if (element.type === 'p') {
        return <p key={element.key}>{removeAsterisks(element.props.children)}</p>;
      }
      return element; // Return other elements unchanged
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
        {!loading && (
          <div>
            <h2>Attractions</h2>
            {displayInfo(generatedInfo.attractions)}

            <h2>Restaurants</h2>
            {displayInfo(generatedInfo.restaurants)}

            <h2>Activities</h2>
            {displayInfo(generatedInfo.activities)}

            <h2>Travel Tips</h2>
            {displayInfo(generatedInfo.travelTips)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
