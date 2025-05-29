import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import MessageDisplay from './MessageDisplay'; // Import the new component

function App() {
  // State to control the bar's current level (0-100)
  const [storageLevel, setStorageLevel] = useState(0);
  const [retrievalLevel, setRetrievalLevel] = useState(0);

  // useRef to hold the interval ID. useRef is used here because
  // it persists its value across renders without causing re-renders
  // when its value changes, which is ideal for mutable values like
  // interval IDs.
  const decayIntervalId = useRef(null);

  // Function to start the bar's decay
  const startDecay = () => {
    // Clear any existing interval to prevent multiple decays running simultaneously
    if (decayIntervalId.current) {
      clearInterval(decayIntervalId.current);
    }

    // Set a new interval for gradual decay
    decayIntervalId.current = setInterval(() => {
      setRetrievalLevel((prevLevel) => {
        // Decrease by a small amount (e.g., 1% per interval)
        const newLevel = prevLevel - (150 - storageLevel)/150;

        // If the bar level drops to 0 or below, clear the interval
        if (newLevel <= 0) {
          clearInterval(decayIntervalId.current);
          decayIntervalId.current = null; // Reset the ref
          return 0; // Ensure it doesn't go negative
        }
        return newLevel;
      });
    }, 100); // Adjust decay speed: e.g., 100ms for faster decay, 200ms for slower
  };

  // Event handler for the button click
  const handleReminderClick = () => {
    // Increase bar level by 20%, capping at 100%
    setRetrievalLevel((prevLevel) => Math.min(prevLevel + 10, 100));
    setStorageLevel((prevLevel) => Math.min(100,prevLevel + 0.1));

    // Immediately start (or restart) the decay process after adding to the bar
    startDecay();
  };

  const handleRetrievalClick = () => {
    if (retrievalLevel < 20) {
      return;
    }
    
    setRetrievalLevel((prevLevel) => Math.min(prevLevel + 30, 100));
    setStorageLevel((prevLevel) => Math.min(100,prevLevel + (100 - retrievalLevel) / 80 * 10));
  };

  const handleResetClick = () => {
    setStorageLevel(0);
    setRetrievalLevel(0);
  };

  // Effect to clean up the interval when the component unmounts
  // This is crucial to prevent memory leaks!
  useEffect(() => {
    return () => {
      if (decayIntervalId.current) {
        clearInterval(decayIntervalId.current);
      }
    };
  }, []); // Empty dependency array means this runs only once on mount and unmount

  return (
    <div className="app-container">
      <div className="bars-container">
        <div className="bar-container">
            <h2>Storage Strength</h2>
            <div
            className="bar-fill"
            style={{ width: `${storageLevel}%` }} // Dynamically set width based on state
          ></div>
        </div>
        <div className="bar-container">
            <h2>Retrieval Strength</h2>
            <div
            className="bar-fill"
            style={{ width: `${retrievalLevel}%` }} // Dynamically set width based on state
          ></div>
        </div>
      </div>
      <div className="buttons-container">
        <div className="button-container">
          <button onClick={handleReminderClick}>Exposure</button>
        </div>
        <div className="button-container">
          <button onClick={handleRetrievalClick}>Retrieval</button>
        </div>
      </div>
      <div className="reset-container">
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <MessageDisplay />
    </div>
  );
}

export default App;