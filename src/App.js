import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

function App() {
  const [topic, setTopic] = useState('');
  const [generatedInfo, setGeneratedInfo] = useState({
    attractions: '',
    restaurants: '',
    itinerary: '', // Changed "Itinerary" to lowercase
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
      const itineraryResponse = await axios.get(`http://127.0.0.1:5000/generate_itinerary_info?topic=${topic}`); // Changed to "itinerary"
      const travelTipsResponse = await axios.get(`http://127.0.0.1:5000/generate_travel_tips?topic=${topic}`);

      setGeneratedInfo({
        attractions: attractionsResponse.data,
        restaurants: restaurantsResponse.data,
        itinerary: itineraryResponse.data, // Changed to "itinerary"
        travelTips: travelTipsResponse.data
      });
    } catch (error) {
      console.error('Error generating travel info:', error);
      setGeneratedInfo({
        attractions: 'Error: Unable to generate attractions info',
        restaurants: 'Error: Unable to generate restaurants info',
        itinerary: 'Error: Unable to generate itinerary info', // Changed to "itinerary"
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
    const lines = infoSection.split('\n');
    const processedInfo = lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('## ')) {
        return <h2 key={index}>{trimmedLine.slice(3)}</h2>;
      } else if (trimmedLine.startsWith('* ')) {
        return <li key={index}>{trimmedLine.slice(2)}</li>;
      } else {
        return <p key={index}>{trimmedLine}</p>;
      }
    });
    
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

            <h2>Itinerary</h2>
            {displayInfo(generatedInfo.itinerary)} {/* Changed to "itinerary" */}

            <h2>Travel Tips</h2>
            {displayInfo(generatedInfo.travelTips)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
