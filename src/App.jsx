import React, { useState, useEffect, useRef } from "react";
import ClapperIcon from "/images/clapper.svg";
import ThinkingIcon from "/images/thinking.svg";
import SendIcon from "/images/send.svg";
import Chat from "/src/Chat.jsx";
import { chain } from "/utils/langchain";

export default function App() {
  // State variables to manage conversation history, user input, and thinking state
  const [convHistory, setConvHistory] = useState([
    { role: "ai", message: "What genre of movie would you like to watch? From what decade? Year? Country? Director? Actor? High IMDB rating? Low IMDB rating?" }
  ]);
  const [userReply, setUserReply] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatWindowRef = useRef(null);

  // Function to handle user input and generate AI response
  async function main() {
    try {
      setIsThinking(true); // Set thinking state to true
      setUserReply(""); // Clear user input
      const convHistoryUserReply = { role: "user", message: userReply };
      setConvHistory(prevConvHistory => [...prevConvHistory, convHistoryUserReply]); // Update conversation history with user input
      const response = await chain.invoke({
        statement: userReply,
        conv_history: convHistory
      }); // Call AI model to generate response
      const convHistoryAIReply = { role: "ai", message: response };
      setConvHistory(prevConvHistory => [...prevConvHistory, convHistoryAIReply]); // Update conversation history with AI response
      setIsThinking(false); // Set thinking state to false
    } catch (error) {
      console.error("Error in main(): ", error);
    }
  }
  
  // Event handler for user input change
  const handleUserReply = event => {
    if (!isThinking) {
      setUserReply(event.target.value); // Update userReply state with input value
    }
  }

  // Event handler for key down event (detects "Enter" key press)
  const handleKeyDown = event => {
    if (!isThinking) {
      if (event.key === "Enter") {
        main(); // Call main function when "Enter" key is pressed
      }
    }
  }

  // Function to scroll chat window to bottom
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }

  // Effect to scroll chat window to bottom whenever conversation history changes
  useEffect(scrollToBottom, [convHistory]);
  
  // Render JSX
  return (
    <div className="screen">
      <header className="titleWrapper">
        <img src={ClapperIcon} alt="film clapper icon" />
        <h1>Fringe Film Finder</h1>
      </header>
      <main className="chatWindow rounded" ref={chatWindowRef}>
        <Chat convHistory={convHistory} scrollToBottom={scrollToBottom} />
        {isThinking && <p className="ai rounded">(thinking...)</p>} {/* Display thinking indicator if AI is processing */}
      </main>
      <div className="inputWrapper">
        <input 
          type="text" 
          className="userInput inputRounded"
          value={userReply} 
          onChange={handleUserReply} 
          onKeyDown={handleKeyDown}
          placeholder="I want to watch a comedy." 
        />
        <button 
          onClick={main} 
          className="sendButton inputRounded" 
          disabled={isThinking ? true : false} // Disable button when AI is thinking
        >
          {isThinking ? 
            <img className="thinkingIcon" src={ThinkingIcon} alt="thinking icon" /> :
            <img className="sendIcon" src={SendIcon} alt="send icon" />
          }
        </button>
      </div>
    </div>
  );
}
