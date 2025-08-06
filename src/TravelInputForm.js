import React, { useState } from 'react';

function TravelInputForm({ onPlanGenerate, loading }) {
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [travelDates, setTravelDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [travelers, setTravelers] = useState(2);
  const [budgetRange, setBudgetRange] = useState('mid-range');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      alert('Please enter a destination');
      return;
    }
    
    onPlanGenerate({
      destination: destination.trim(),
      departure: departure.trim() || 'Your Location',
      travelDates,
      travelers,
      budgetRange
    });
  };

  return (
    <div className="travel-input-form">
      <div className="form-header">
        <h1>🌍 AI Travel Buddy</h1>
        <p>Your Complete Travel Planning Assistant</p>
      </div>
      
      <form onSubmit={handleSubmit} className="planning-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="destination">✈️ Where are you going?</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, Tokyo, New York"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="departure">📍 Departing from</label>
            <input
              type="text"
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="e.g., London, Mumbai, Los Angeles"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start-date">📅 Start Date</label>
            <input
              type="date"
              id="start-date"
              value={travelDates.startDate}
              onChange={(e) => setTravelDates({...travelDates, startDate: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="end-date">📅 End Date</label>
            <input
              type="date"
              id="end-date"
              value={travelDates.endDate}
              onChange={(e) => setTravelDates({...travelDates, endDate: e.target.value})}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="travelers">👥 Number of Travelers</label>
            <select
              id="travelers"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
            >
              <option value={1}>1 Traveler</option>
              <option value={2}>2 Travelers</option>
              <option value={3}>3 Travelers</option>
              <option value={4}>4 Travelers</option>
              <option value={5}>5+ Travelers</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="budget">💰 Budget Range</label>
            <select
              id="budget"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
            >
              <option value="budget">Budget Travel</option>
              <option value="mid-range">Mid-range</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        <button type="submit" className="generate-plan-btn" disabled={loading}>
          {loading ? (
            <>
              <div className="loading-small"></div>
              Creating Your Perfect Trip...
            </>
          ) : (
            <>
              🚀 Create My Travel Plan
            </>
          )}
        </button>
      </form>

      <div className="features-preview">
        <h3>🎯 What You'll Get:</h3>
        <div className="feature-list">
          <span className="feature-item">✈️ Flight Options</span>
          <span className="feature-item">🚂 Train & Bus Routes</span>
          <span className="feature-item">🏨 Hotel Recommendations</span>
          <span className="feature-item">🗓️ Day-by-Day Itinerary</span>
          <span className="feature-item">🍽️ Restaurant Suggestions</span>
          <span className="feature-item">🎯 Tourist Attractions</span>
          <span className="feature-item">🌤️ Weather Information</span>
          <span className="feature-item">💰 Budget Planning</span>
          <span className="feature-item">📱 Social Sharing</span>
        </div>
      </div>
    </div>
  );
}

export default TravelInputForm;