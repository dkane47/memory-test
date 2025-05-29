import React, { useState } from 'react';

// Define your messages here
const MESSAGES = [
  "Imagine you want to remember something. Maybe it's 18 x 8 = 144. What is the best way to remember it?",
  'Cognitive scientists divide the strength of memory into "storage strength" and "retrieval strength."',
  "Retrieval strength refers to how easily you can recall an idea. For instance, you probably have high retrieval strength of what you ate for dinner last night.",
  "Storage strength refers to how well a memory is stored for the long-term. What you ate last night probably has low storage strength (you won't remember it in a week or two), while your phone number has high retrieval strength.",
  "There are two major ways humans can strengthen memory. Exposure refers to being told something, reading something, etc. Retrieval refers to actively pulling something out of your memory.",
  'Exposure would be me telling you, "18 x 8 = 144."',
  'Retrieval would be me asking, "What\'s 18 x 8?"',
  "Retrieval is the best way to improve storage strength, but it relies on retrieval strength. If you try to retrieve something and you can't remember it, that doesn't do any good.",
  "Paradoxically, the best way to improve storage strength is to retrieve a memory when retrieval strength is relatively low.",
  "If I ask you 18 x 8 over and over again, that won't help very much.",
  "But if I wait, and let a bit of forgetting happen,",
  "And then I ask,",
  '"What\'s 18 x 8?"',
  "That will do more to improve storage strength.",
  "The catch is that only works when retrieval strength is still high enough for successful retrieval. If you let retrieval strength get too low, retrieval won't work, and you'll need more exposure.",
  "One way to think about storage strength is how easily something can be relearned. One example might be a childhood home phone number. You might not remember it right away, but with a reminder it will come back quickly.",
  "The higher storage strength is, the slower you forget.",
  "The best way to increase storage strength is to retrieve when retrieval strenght isn't too high and isn't too low.",
  "Try playing around with the demo, and see how fast you can increase storage strength",
  "Final point: this is a simplified mental model. Human memory is more copmlicated than this. There's a lot more randomness, there's variation between individuals, and there are other factors that influence memory.",
  "For instance, prior knowledge supports storage strength. Storage strength increases more quickly for topics a learner alreadys knows a lot about to connect their new knowledge to.",
  "But this mental model is a good start, and can help teachers understand the basics of how to create lasting memories for students."
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