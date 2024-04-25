import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file


function App() {
  const [topic, setTopic] = useState('');
  const [numDays, setNumDays] = useState('');
  const [generatedInfo, setGeneratedInfo] = useState({
    attractions: '',
    restaurants: '',
    itinerary: '',
    travelTips: ''
  });
  const [loading, setLoading] = useState(false); // Add loading state
  
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleNumDaysChange = (e) => {
    setNumDays(e.target.value);
  };

  const handleGenerateInfo = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const attractionsResponse = await axios.get(`http://127.0.0.1:5000/generate_attractions_info?topic=${topic}`);
      const restaurantsResponse = await axios.get(`http://127.0.0.1:5000/generate_restaurants_info?topic=${topic}`);
      const itineraryResponse = await axios.get(`http://127.0.0.1:5000/generate_itinerary_info?topic=${topic}&num_days=${numDays}`);
      const travelTipsResponse = await axios.get(`http://127.0.0.1:5000/generate_travel_tips?topic=${topic}`);

      setGeneratedInfo({
        attractions: attractionsResponse.data,
        restaurants: restaurantsResponse.data,
        itinerary: itineraryResponse.data,
        travelTips: travelTipsResponse.data
      });
    } catch (error) {
      console.error('Error generating travel info:', error);
      setGeneratedInfo({
        attractions: 'Error: Unable to generate attractions info',
        restaurants: 'Error: Unable to generate restaurants info',
        itinerary: 'Error: Unable to generate itinerary info',
        travelTips: 'Error: Unable to generate travel tips'
      });
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  const displayInfo = (infoSection) => {

    return infoSection.split('\n').map((line, index) => {
      const trimmedLine = line.trim(); // Trim leading/trailing spaces

      if (trimmedLine.startsWith('## ')) {
        // Remove leading ## for headings
        return <h2 key={index}>{trimmedLine.slice(3)}</h2>;
      } else if (trimmedLine.startsWith('* ')) {
        // Remove leading asterisk and any subsequent asterisks within the list item content
        return (
          <li key={index}>
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.startsWith('  * ')) {
        // Remove leading spaces and asterisk for sub-bullet points
        return <li key={index}>{trimmedLine.slice(4)}</li>;
      } else if (trimmedLine.match(/^Further Reading|^/)) {
        // Handle "Further Reading" section without asterisks
        return <p key={index}>{trimmedLine}</p>;
      } else if (trimmedLine.match(/^https?:\/\//)) {
        // Handle links (URLs)
        const url = trimmedLine;
        return (
          <p key={index}>
            <a href={url} target="_blank" rel="noreferrer noopener">
              {url}
            </a>
          </p>
        );
      } else {
        // Remove remaining asterisks within paragraphs or descriptions,
        // handle itinerary formatting
        if (trimmedLine.startsWith('*Day ')) {
          return <h3 key={index} className="itinerary-day">{trimmedLine}</h3>;
        } else if (trimmedLine.length > 0) {
          return (
            <p key={index} className="itinerary-details">
              {trimmedLine.replace(/\*/g, '')}
            </p>
          );
        } else {
          return null; // Ignore empty lines
        }
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
        <label htmlFor="numDays">Number of Days (optional):</label>
        <input
          type="text"
          id="numDays"
          value={numDays}
          onChange={handleNumDaysChange}
        />
        <button onClick={handleGenerateInfo}>Generate Info</button>
      </div>
      <div className="info-container">
        {loading && <div className="loading"></div>}
        {!loading && (
          <div>
            {generatedInfo.attractions && (
              <>
                <h2>Attractions</h2>
                <ul>{displayInfo(generatedInfo.attractions)}</ul>
              </>
            )}

            {generatedInfo.restaurants && (
              <>
                <h2>Restaurants</h2>
                <ul>{displayInfo(generatedInfo.restaurants)}</ul>
              </>
            )}

            {generatedInfo.itinerary && (
              <>
                <h2>Itinerary</h2>
                <div className="itinerary-container">{displayInfo(generatedInfo.itinerary)}</div>
              </>
            )}

            {generatedInfo.travelTips && (
              <>
                <h2>Travel Tips</h2>
                <ul>{displayInfo(generatedInfo.travelTips)}</ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
