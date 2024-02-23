// Importing the SupabaseVectorStore from the langchain/vectorstores/supabase module
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"

// Importing the OpenAIEmbeddings from the langchain/embeddings/openai module
import { OpenAIEmbeddings } from "langchain/embeddings/openai"

// Importing the createClient function from the @supabase/supabase-js module
import { createClient } from "@supabase/supabase-js"

// Getting the OpenAI API key from the environment variables
const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY

// Creating a new instance of OpenAIEmbeddings with the OpenAI API key
const embeddings = new OpenAIEmbeddings({ openAIApiKey })

// Getting the Supabase API key and URL from the environment variables
const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY
const sbUrl = import.meta.env.VITE_SUPABASE_URL_LC_CHATBOT

// Creating a new Supabase client with the Supabase URL and API key
const client = createClient(sbUrl, sbApiKey)

// Creating a new instance of SupabaseVectorStore with the embeddings, client, and some additional options
const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents"
})

// Creating a retriever from the vector store
const retriever = vectorStore.asRetriever()

// Exporting the retriever
export { retriever }
