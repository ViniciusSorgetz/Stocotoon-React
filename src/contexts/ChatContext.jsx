import { useState, createContext } from "react";

export const ChatContext = createContext({});

function ChatProvider({ children }){

    const [ team, setTeam ] = useState(null);
    const [ chatId, setChatId ] = useState(null);

    return (
        <ChatContext.Provider value={{ team, setTeam, chatId, setChatId }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;