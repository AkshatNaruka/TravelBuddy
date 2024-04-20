import React, { useState } from 'react';
import './App.css';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [response, setResponse] = useState('');
  const [examples, setExamples] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setSymptoms(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send symptoms to backend and get potential health problem
      const response = await fetch(`http://127.0.0.1:5000/get_health_condition?symptoms=${symptoms}`);

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }

      const data = await response.json();
      setResponse(data.health_problem || 'No health problem identified.'); // Handle potential null response
      setError('');

      // If a health problem is identified, fetch detailed information
      if (data.health_problem) {
        await handleExamples(data.health_problem);
      } else {
        setExamples([]); // Clear examples if no health problem found
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('');
      setError('An error occurred while fetching the response.');
    }
  };

  const handleExamples = async (healthProblem) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/fetch_medical_data?health_problem=${healthProblem}`);

      if (!response.ok) {
        throw new Error('Failed to fetch examples from the server');
      }

      const data = await response.json();
      setExamples(data);
    } catch (error) {
      console.error('Error fetching examples:', error);
    }
  };

  return (
    <div className="App">
      <h1>Health Chatbot</h1>
      <div className="chat-container">
        <div className="chat">
          {response && <div className="response">{response}</div>}
          {error && <div className="error">{error}</div>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={symptoms}
            onChange={handleChange}
            placeholder="Enter your symptoms..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {examples.length > 0 && (
        <div className="examples">
          <h2>Details about {examples.health_problem}</h2>
          <ul>
            {/* Conditionally render details based on available properties in the response from the backend */}
            {examples.hasOwnProperty('causes') && <li>Causes: {examples.causes.join(", ")}</li>}
            {examples.hasOwnProperty('symptoms') && <li>Symptoms: {examples.symptoms.join(", ")}</li>}
            {examples.hasOwnProperty('treatments') && <li>Treatments: {examples.treatments.join(", ")}</li>}
            {/* Add more properties as required based on your backend data structure */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
