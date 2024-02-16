import React, { useState, useEffect } from "react"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { createClient } from "@supabase/supabase-js"
import { StringOutputParser } from "langchain/schema/output_parser"



export default function App(){
  const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY
  const embeddings = new OpenAIEmbeddings({ openAIApiKey })
  const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY
  // console.log("sbApiKey: ",sbApiKey)
  const sbUrl = import.meta.env.VITE_SUPABASE_URL_LC_CHATBOT
  // console.log("sbUrl: ",sbUrl)
  const client = createClient(sbUrl, sbApiKey)
  const llm = new ChatOpenAI({ openAIApiKey })

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents"
  })
   
  const retriever = vectorStore.asRetriever()

  const standaloneStatementTemplate = `Given a statement, convert it to a standalone statement. 
    statement:{statement}
    standalone statement:`

  const standaloneStatementPrompt = PromptTemplate.fromTemplate(standaloneStatementTemplate)

  const chain = standaloneStatementPrompt.pipe(llm).pipe(new StringOutputParser()).pipe(retriever)
  // const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser()).pipe(retriever)
  console.log("chain ",chain)
  useEffect(() => {
    const generateStandaloneStatement = async () => {
      const response = await chain.invoke({
        statement: "My favorite movie is Alien because I really like sci-fi horror. Can you recommend something like that?",
      });
      console.log("response: ", response);
    };

    generateStandaloneStatement();
  }, []);
  return (
    <>
      <h1>hey world</h1>
      {/* <p>{tweetPrompt}</p> */}
    </>
  )
}

// const tweetTemplate = "Generate a promotional tweet for a product from this product description: {productDesc}"

//   const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate)

//   console.log("tweetPrompt: ", tweetPrompt)

//   const tweetChain = tweetPrompt.pipe(llm)

//   console.log("tweetChain ", tweetChain)

//   useEffect(() => {
//     const generateTweet = async () => {
//       const response = await tweetChain.invoke({
//         productDesc: "butt crack manscaper",
//       });
//       console.log("response: ", response.content);
//     };

//     generateTweet();
//   }, []);