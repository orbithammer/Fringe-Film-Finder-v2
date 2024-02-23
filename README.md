# Fringe Film Finder

Fringe Film Finder is a React application that uses an AI model with LangChain to recommend movies based on user input.

## Overview

The application prompts the user to provide preferences for the type of movie they want to watch. The AI model then generates a recommendation based on these preferences.

## Features

- Conversation history: The application maintains a history of the conversation between the user and the AI.
- User input: The user can input their movie preferences.
- AI response: The AI model generates a movie recommendation based on the user's input.
- Thinking state: A thinking indicator is displayed while the AI model is processing the user's input.

## Installation

1. Clone the repository: 
```
git clone https://https://github.com/orbithammer/Fringe-Film-Finder-v2
```

2. Install dependencies: 
```
npm install
```

3. Set up environment variables:

   - You need to provide your OpenAI API key and OpenAI Assistant key as environment variables. Create a `.env` file in the root directory of the project and add the following:

     ```plaintext
     VITE_OPENAI_API_KEY=your-openai-api-key
     VITE_SUPABASE_API_KEY=your-supabase-api-key
     VITE_SUPABASE_URL_LC_CHATBOT=your-supabase-project-url
     ```

4. Start the application: 
```
npm start
```


## Usage

Enter your movie preferences in the input field and press Enter. The AI model will generate a movie recommendation based on your input.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
