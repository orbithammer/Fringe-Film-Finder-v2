import React, { useState } from "react";

// Function to style text messages and extract src, imdbID, and markdownRemoved content
function styleText(message) {
    // Regular expressions to identify URLs, IMDB IDs, and Markdown syntax
    const srcRegex = /(https?:\/\/[^\s]+)/g; // Matches URLs
    const imdbRegex = /\b(tt\d{6,8})\b/g; // Matches IMDB IDs
    const markdownRegex = /\!\[(.*?)\]\((.*?)\)/; // Matches Markdown syntax
    // Extract src, imdbID, and remove URLs, IMDB IDs, and Markdown syntax from the message
    const src = message.match(srcRegex);
    const imdbID = message.match(imdbRegex);
    const srcRemoved = message.replace(srcRegex, "");
    const imdbIdRemoved = srcRemoved.replace(imdbRegex, "");
    const markdownRemoved = imdbIdRemoved.replace(markdownRegex, "");
    // Return styled text object with extracted content
    return { markdownRemoved, src, imdbID };
}

// Chat component
const Chat = ({ convHistory, scrollToBottom }) => {
    const [imageExists, setImageExists] = useState(true)
    const handleImageError = () => {
        setImageExists(false)
    }
    return (
        <>
            {/* Map through conversation history and render chat messages */}
            {convHistory.map((chatMessage, index) => {
                const { role, message } = chatMessage;
                // Extract styled text content
                const { markdownRemoved, src, imdbID } = styleText(message);
                return (
                    <div key={index} className={`chat-message ${role}`}>
                        <div className={src ? "recommendation" : ""}>
                            {/* Render IMDB link and poster if imdbID exists */}
                            {imdbID && (
                                <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank" rel="noopener noreferrer" className="imdb-link">
                                    Click poster for IMDB link.
                                    {/*Renders poster if URL returns an image file. */}
                                    {imageExists ? (
                                        <img src={src} alt="click here for imdb link" onLoad={scrollToBottom} onError={handleImageError} />
                                        ) : (
                                            <p>Image not found</p>
                                        )}
                                </a>
                            )}
                            <p>{markdownRemoved}</p> {/* Render processed text message */}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Chat; // Export Chat component
