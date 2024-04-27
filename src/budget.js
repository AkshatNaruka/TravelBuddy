import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Budget({ topic }) {
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBudgetInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/generate_travel_budget?topic=${topic}`);
        // Remove asterisks and bullet points from the budget info
        const formattedInfo = response.data.replace(/\*+/g, '').replace(/(^|\n)\s*•+/g, '\n');
        setBudgetInfo(formattedInfo);
      } catch (error) {
        console.error('Error fetching budget info:', error);
        setBudgetInfo('Error: Unable to fetch budget info');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetInfo();
  }, [topic]);

  return (
    <div className="info-box-container budget-info">
      <div className="info-box">
        <h2>Budget Information for {topic}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{budgetInfo}</p>
        )}
      </div>
    </div>
  );
}

export default Budget;
