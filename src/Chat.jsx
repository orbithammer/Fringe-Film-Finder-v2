import React from "react"

function styleText(message) {
    const srcRegex = /(https?:\/\/[^\s]+)/g
    const imdbRegex = /\b(tt\d{6,8})\b/g;
    const markdownRegex = /\!\[(.*?)\]\((.*?)\)/
    const src = message.match(srcRegex)
    const imdbID = message.match(imdbRegex)
    const srcRemoved = message.replace(srcRegex, "")
    const imdbIdRemoved = srcRemoved.replace(imdbRegex, "")
    const markdownRemoved = imdbIdRemoved.replace(markdownRegex, "")
    return {markdownRemoved, src, imdbID}
}


const Chat = ({convHistory, scrollToBottom}) => {
    return (
        <>
            {convHistory.map((chatMessage, index) => {
                const { role, message } = chatMessage
                const {markdownRemoved, src, imdbID} = styleText(message)
                return (
                    <div key={index} className={`chat-message ${role}`}>
                        <div className={src ? "recommendation" : ""}>
                            {imdbID && <a href={`https://www.imdb.com/title/${imdbID}/` } target="_blank" rel="noopener noreferrer" className="imdb-link">
                                    Click poster for IMDB link.
                                    {src && <img src={src} alt="click here for imdb link" onLoad={scrollToBottom} />}
                                </a>
                            }
                            <p>{markdownRemoved}</p>
                        </div>
                    </div>
                    )
                }
            )}
        </>
    )
}

export default Chat