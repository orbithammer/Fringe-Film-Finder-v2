import React, { useState, useEffect, useRef } from "react"
import ClapperIcon from "/images/clapper.svg"
import ThinkingIcon from "/images/thinking.svg"
import SendIcon from "/images/send.svg"
import Chat from "/src/Chat.jsx"
import { chain } from "/utils/langchain"


export default function App(){
  const [convHistory, setConvHistory] = useState([{ role:"ai", message: "What genre of movie would you like to watch? From what decade? Year? Country? Director? Actor? High IMDB rating? Low IMDB rating?"}])
  const [userReply, setUserReply] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const chatWindowRef = useRef(null)

  async function main() {
    try{setIsThinking(true)
      setUserReply("")
      const convHistoryUserReply = {role:"user", message: userReply}
      setConvHistory(prevConvHistory => [...prevConvHistory, convHistoryUserReply])
      const response = await chain.invoke({
        statement: userReply,
        conv_history: convHistory
      })
      const convHistoryAIReply = {role:"ai", message: response}
      setConvHistory(prevConvHistory => [...prevConvHistory, convHistoryAIReply])
      setIsThinking(false)
    } catch(error) {
      console.error("Error in main(): ", error)
    }
  }
  
  const handleUserReply = event => {
    if(!isThinking) {
      setUserReply(event.target.value)
    }
  }

  const handleKeyDown = event => {
    if(!isThinking) {
      if(event.key === "Enter") {
        main()
      }
    }
  }

  const scrollToBottom = () => {
    if(chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }

  useEffect(scrollToBottom,[convHistory])
  
  return (
    <div className="screen">
      <header className="title-wrapper">
        <img src={ClapperIcon} alt="film clapper icon" />
        <h1>Fringe Film Finder</h1>
      </header>
      <main className="chat-window rounded" ref={chatWindowRef}>
        <Chat convHistory={convHistory} scrollToBottom={scrollToBottom}/>
        {isThinking && <p className="ai rounded">(thinking...)
        </p>}
      </main>
      <div className="input-wrapper">
        <input 
          type="text" 
          className="user-input input-rounded"
          value={userReply} 
          onChange={handleUserReply} 
          onKeyDown={handleKeyDown}
          placeholder="I want to watch a comedy." 
        />
        <button onClick={main} 
          className="send-button input-rounded" disabled={isThinking ? true : false}>
          {isThinking ? 
            <img className="thinking-icon" src={ThinkingIcon} alt="thinking icon" /> :
            <img className="send-icon" src={SendIcon} alt="send icon" />
          }
        </button>
      </div>
    </div>
  )
}
