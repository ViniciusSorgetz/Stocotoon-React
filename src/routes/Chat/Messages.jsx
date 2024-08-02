import "./chat.css";
import Send from "../../assets/Send.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User";
import { ChatContext } from "../../contexts/ChatContext";
import stocotoonAPI from "../../axios/config";

function Messages() {
  const [messageContent, setMessageContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { session } = useContext(UserContext);
  const { chatId } = useContext(ChatContext);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if(chatId){
        getData();
    }
  }, [chatId]);

  const getData = async () => {
    const { data } = await stocotoonAPI.get(`/chat/${chatId}`, {
      headers: {
        Authorization: `Bearer ${session.UserToken}`,
      },
    });
    console.log(data);
    setMessages(data.messages);
    console.log(data.messages);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      content: messageContent,
      UserId: session.UserId,
      ChatId: chatId,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    try {
      await stocotoonAPI.post("/message/send", newMessage, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="messages d-flex flex-column bg-preto p-3">
      {errorMessage.length !== 0 && (
        <p className="text-danger text-center lead">{errorMessage}</p>
      )}
      {chatId && chatId !== null ? (
        <div>
          <div className="mensagens">
            {messages ? messages.map((message) => (
                <div key={message.id}>
                    <p>{message.content}</p>
                </div>
            )) : <p>sem mensagens</p>}
          </div>

          <div className="enviar-mensagem d-flex">
            <textarea
              placeholder="Escreva sua mensagem aqui"
              onChange={(e) => setMessageContent(e.target.value)}
              value={messageContent}
            ></textarea>
            <button className="border-0 bg-white" onClick={sendMessage}>
              <img src={Send} alt="botão de enviar" />
            </button>
          </div>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            display: "flex",
            color: "white",
            margin: "auto",
          }}
        >
          Nenhum chat selecionado
        </p>
      )}
    <button onClick={() => console.log(messages)}></button>
    </div>
  );
}

export default Messages;
