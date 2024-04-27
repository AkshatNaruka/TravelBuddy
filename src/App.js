import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Attractions from './Attractions';
import Restaurants from './Restaurants';
import Itinerary from './Itinerary';
import TravelTips from './TravelTips';
import Budget from './budget';


function App() {
  const [topic, setTopic] = useState('');
  const [generatedInfo, setGeneratedInfo] = useState({
    attractions: '',
    restaurants: '',
    itinerary: '',
    travelTips: ''
  });
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleGenerateInfo = async () => {
    setLoading(true);
    try {
      const attractionsResponse = await axios.get(`http://127.0.0.1:5000/generate_attractions_info?topic=${topic}`);
      const restaurantsResponse = await axios.get(`http://127.0.0.1:5000/generate_restaurants_info?topic=${topic}`);
      const itineraryResponse = await axios.get(`http://127.0.0.1:5000/generate_itinerary_info?topic=${topic}`);
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
      setLoading(false);
    }
  };

  const displayInfo = (infoSection) => {
    const lines = infoSection.split('\n');
  
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
  
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index}>{trimmedLine.slice(4)}</h3>;
      } else if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index}>
            {trimmedLine.slice(2).replace(/\*/g, '')}
          </li>
        );
      } else if (trimmedLine.startsWith('  * ')) {
        return <li key={index}>{trimmedLine.slice(4)}</li>;
      } else if (trimmedLine.match(/^Further Reading|^/)) {
        return <p key={index}>{trimmedLine}</p>;
      } else if (trimmedLine.match(/^https?:\/\//)) {
        const url = trimmedLine;
        return (
          <p key={index}>
            <a href={url} target="_blank" rel="noreferrer noopener">
              {url}
            </a>
          </p>
        );
      } else {
        if (trimmedLine.length > 0) {
          return (
            <p key={index} className="itinerary-details">
              {trimmedLine.replace(/\*/g, '')}
            </p>
          );
        } else {
          return null;
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
        <button onClick={handleGenerateInfo}>
          {loading ? (
            <div className="loading"></div>
          ) : (
            "Generate Info"
          )}
        </button>
      </div>
      <div className="info-grid">
        <div className="info-box-container">
          {generatedInfo.attractions && (
            <Attractions attractions={displayInfo(generatedInfo.attractions)} />
          )}
        </div>
        <div className="info-box-container">
          {generatedInfo.restaurants && (
            <Restaurants restaurants={displayInfo(generatedInfo.restaurants)} />
          )}
        </div>
        <div className="info-box-container">
          {generatedInfo.itinerary && (
            <Itinerary itinerary={displayInfo(generatedInfo.itinerary)} />
          )}
        </div>
        <div className="info-box-container">
          {generatedInfo.travelTips && (
            <TravelTips travelTips={displayInfo(generatedInfo.travelTips)} />
          )}
        </div>
      </div>
      {generatedInfo.attractions && generatedInfo.restaurants && generatedInfo.itinerary && generatedInfo.travelTips && (
        <Budget topic={topic} />
      )}
    </div>
  
  );
}

export default App;
