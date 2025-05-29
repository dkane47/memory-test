import React, { useState } from 'react';

// Define your messages here
const MESSAGES = [
  'Cognitive scientists divide the strength of memory into "storage strength" and "retrieval strength."',
  "Retrieval strength refers to how easily you can recall an idea. For instance, you probably have high retrieval strength of what you ate for dinner last night.",
  "Storage strength refers to how well a memory is stored for the long-term. What you ate last night probably has low storage strength (you won't remember it in a week or two), while your phone number has high retrieval strength.",
  "There are two major ways humans can strengthen memory. Exposure refers to being told something, reading something, etc. Retrieval refers to actively pulling something out of your memory.",
  "You can push the button multiple times.",
  "Each push adds another 20% to the bar.",
  "Keep an eye on the bar's level!",
  "Try to make it reach 100%.",
  "This is the penultimate message.",
  "This is the final message. Clicking forward again will clear the messages."
];

function MessageDisplay() {
  // State to track the current message index
  // -1 indicates no messages are displayed (cleared state)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // --- Handlers for Navigation ---

  const handleForward = () => {
    // If we're at the last message, clear them
    if (currentMessageIndex >= MESSAGES.length - 1) {
      setCurrentMessageIndex(-1); // Set to -1 to indicate cleared state
    } else {
      // Otherwise, move to the next message
      setCurrentMessageIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleBack = () => {
    // Only go back if there's a previous message to show
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(prevIndex => prevIndex - 1);
    } else if (currentMessageIndex === -1 && MESSAGES.length > 0) {
      // If messages were cleared, and there are messages, go to the first one
      setCurrentMessageIndex(0);
    }
  };

  const handleClear = () => {
    setCurrentMessageIndex(-1); // Clear all messages
  };

  // Determine if we should display any message
  const displayMessage = currentMessageIndex !== -1 && currentMessageIndex < MESSAGES.length;

  return (
    <div className="message-display-container">
      <h2>Messages</h2>
      <div className="message-content">
        {displayMessage ? (
          <p>{MESSAGES[currentMessageIndex]}</p>
        ) : (
          <p>Messages cleared. Click "Back" to see the first message again.</p>
        )}
      </div>
      <div className="message-controls">
        <button onClick={handleBack} disabled={currentMessageIndex === 0 && currentMessageIndex !== -1}>
          Back
        </button>
        <button onClick={handleForward}>
          Forward
        </button>
        <button onClick={handleClear} disabled={currentMessageIndex === -1}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default MessageDisplay;