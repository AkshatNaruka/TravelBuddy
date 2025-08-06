import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TravelInputForm from './TravelInputForm';
import Attractions from './Attractions';
import Restaurants from './Restaurants';
import Itinerary from './Itinerary';
import TravelTips from './TravelTips';
import Budget from './budget';
import FlightSearch from './FlightSearch';
import TrainSearch from './TrainSearch';
import BusSearch from './BusSearch';
import HotelSearch from './HotelSearch';
import WeatherInfo from './WeatherInfo';
import SocialShare from './SocialShare';


function App() {
  const [travelPlan, setTravelPlan] = useState(null);
  const [generatedInfo, setGeneratedInfo] = useState({
    attractions: '',
    restaurants: '',
    itinerary: '',
    travelTips: ''
  });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handlePlanGenerate = async (planDetails) => {
    setLoading(true);
    setTravelPlan(planDetails);
    setShowResults(true);
    
    try {
      const [attractionsResponse, restaurantsResponse, itineraryResponse, travelTipsResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:5000/generate_attractions_info?topic=${planDetails.destination}`),
        axios.get(`http://127.0.0.1:5000/generate_restaurants_info?topic=${planDetails.destination}`),
        axios.get(`http://127.0.0.1:5000/generate_itinerary_info?topic=${planDetails.destination}`),
        axios.get(`http://127.0.0.1:5000/generate_travel_tips?topic=${planDetails.destination}`)
      ]);

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
      {!showResults ? (
        <TravelInputForm onPlanGenerate={handlePlanGenerate} loading={loading} />
      ) : (
        <div className="travel-results">
          <div className="results-header">
            <h1>🌟 Your Complete Travel Plan for {travelPlan?.destination}</h1>
            <button 
              onClick={() => {setShowResults(false); setGeneratedInfo({attractions: '', restaurants: '', itinerary: '', travelTips: ''});}} 
              className="new-search-btn"
            >
              🔄 Plan Another Trip
            </button>
          </div>

          {/* Transportation Section */}
          <div className="section">
            <h2 className="section-title">🚀 Transportation Options</h2>
            <div className="transport-grid">
              <FlightSearch destination={travelPlan?.destination} departure={travelPlan?.departure} />
              <TrainSearch destination={travelPlan?.destination} departure={travelPlan?.departure} />
              <BusSearch destination={travelPlan?.destination} departure={travelPlan?.departure} />
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="section">
            <h2 className="section-title">🏨 Accommodation</h2>
            <div className="accommodation-grid">
              <HotelSearch destination={travelPlan?.destination} budget={travelPlan?.budgetRange} />
              <WeatherInfo destination={travelPlan?.destination} />
            </div>
          </div>

          {/* Travel Information Section */}
          <div className="section">
            <h2 className="section-title">📋 Travel Information</h2>
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
          </div>

          {/* Budget Section */}
          {generatedInfo.attractions && generatedInfo.restaurants && generatedInfo.itinerary && generatedInfo.travelTips && (
            <div className="section">
              <h2 className="section-title">💰 Budget Planning</h2>
              <Budget topic={travelPlan?.destination} />
            </div>
          )}

          {/* Social Sharing Section */}
          {generatedInfo.attractions && (
            <div className="section">
              <h2 className="section-title">📱 Share Your Journey</h2>
              <SocialShare destination={travelPlan?.destination} tripPlan={generatedInfo} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
