import { useState, createContext, useEffect } from "react";
import { io } from 'socket.io-client';

export const ChatContext = createContext({});

function ChatProvider({ children }){

    const [ team, setTeam ] = useState(null);
    const [ chatId, setChatId ] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("wss://stocotoon-socket-production.up.railway.app", {
            extraHeaders: {
              //token: session.UserToken,
              //ChatId: chatId
            }
          });
          newSocket.on("connect");
          setSocket(newSocket);
    }, []);

    return (
        <ChatContext.Provider value={{ team, setTeam, chatId, setChatId, socket, setSocket }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;