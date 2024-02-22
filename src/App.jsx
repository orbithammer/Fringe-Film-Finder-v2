import React, { useState, useEffect, useRef } from "react"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"
import { StringOutputParser } from "langchain/schema/output_parser"
import { RunnablePassthrough, RunnableSequence } from "langchain/schema/runnable"
import { retriever } from '/utils/retriever'
import { combineDocuments } from "/utils/combineDocuments"
import ClapperIcon from "/images/clapper.svg"
import ThinkingIcon from "/images/thinking.svg"
import SendIcon from "/images/send.svg"
import Chat from "/src/Chat.jsx"
import { chain } from "/utils/langchain"


export default function App(){
  const [convHistory, setConvHistory] = useState([{ role:"ai", message: "What genre of movie would you like to watch? From what decade? Year? Country? Director? Actor? "}])
  const [userReply, setUserReply] = useState("I want to watch a comedy.")
  // const [retrieverData, setRetrieverData] = useState([])
  const [isThinking, setIsThinking] = useState(false)
  // console.log("retrieverData: ", retrieverData)
  const chatWindowRef = useRef(null)
  // const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY
  // const llm = new ChatOpenAI({ openAIApiKey })

  async function main() {
    try{setIsThinking(true)
      const convHistoryUserReply = {role:"user", message: userReply}
      setConvHistory(prevConvHistory => [...prevConvHistory, convHistoryUserReply])
      const response = await chain.invoke({
        statement: userReply,
        conv_history: convHistory
      })
      // console.log("user convHistory: ", convHistory)
      // console.log("convHistoryUserReply ", convHistoryUserReply)
      console.log("response: ", response)
      const convHistoryAIReply = {role:"ai", message: response}
      // console.log("convHistoryAIReply ",convHistoryAIReply)
      setConvHistory(prevConvHistory => [...prevConvHistory, convHistoryAIReply])
      // console.log("AI convHistory: ", convHistory)  
      setIsThinking(false)
      setUserReply("")
    } catch(error) {
      console.error("Error in main(): ", error)
    }
  }
  console.log("convHistory: ", convHistory)
  
  // useEffect(() => {
    // console.log("triggered", sendTrigger)
    // console.log("userReply ",userReply)
    // setUserReply("")
  // },[convHistory])

  const handleUserReply = event => {
    setUserReply(event.target.value)
  }

  const handleKeyDown = event => {
    if(event.key === "Enter") {
      main()
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
        {/* <p className="start-message rounded">What kind of movie would you like to watch?</p> */}
        <Chat convHistory={convHistory} scrollToBottom={scrollToBottom}/>
        {/* {isThinking && <p className="user-temp rounded">{tempUserReply}</p>} */}
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
        <button onClick={main} className="send-button input-rounded">
          {isThinking ? 
            <img className="thinking-icon" src={ThinkingIcon} alt="thinking icon" /> :
            <img className="send-icon" src={SendIcon} alt="send icon" />
          }
        </button>
      </div>
    </div>
  )
}
