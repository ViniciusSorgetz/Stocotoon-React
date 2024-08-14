import "./chat.css";
import Send from "../../assets/Send.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User";
import { ChatContext } from "../../contexts/ChatContext";
import stocotoonAPI from "../../axios/config";
import { useParams } from "react-router-dom";

function Messages() {
  const [messageContent, setMessageContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { session } = useContext(UserContext);
  const { chatId, socket } = useContext(ChatContext);
  const [messages, setMessages] = useState(null);
  let { ChatIndex } = useParams();

  useEffect(() => {
    if(!chatId || !session) return;
    getData();
  }, [chatId]);

  useEffect(() => {
    if(!socket) return;
    socket.on("recieve-message", newMessage => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    })
  }, [socket]);

  const getData = async () => {
    const { data } = await stocotoonAPI.get(`/chat/${chatId}`, {
      headers: {
        Authorization: `Bearer ${session.UserToken}`,
      },
    });
    setMessages(data.messages.reverse());
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      nick: session.Username,
      content: messageContent,
      UserId: session.UserId,
      ChatId: chatId,
      createdAt: Date.now(),
    };
    if (messageContent !== "") {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      socket.emit("send-message", newMessage, chatId);
    }
    try {
      await stocotoonAPI.post("/message/send", newMessage, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      setMessageContent("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="messages-container" style={{ backgroundColor: "#1E1E1E"}}>
      {chatId && ChatIndex && chatId !== null ? (
        <div className="messages d-flex flex-column  bg-cinza pb-3">
          {errorMessage.length !== 0 && (
            <p className="text-danger text-center lead">{errorMessage}</p>
          )}
          <div className="mensagens ms-3">
            {messages ? (
              messages.map((message) => (
                <div
                  className={
                    session.Username === message.nick
                      ? "mensagem-proprio me-2"
                      : "mensagem-outro me-2"
                  }
                  key={message.id}
                >
                  <div className="orientacao text-light">
                    <p className="fw-bold"> {message.nick} </p>
                    <p> • </p>
                    <p>
                      {" "}
                      {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="conteudo px-3 py-2 mb-3 rounded-3">
                    <p>{message.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>sem mensagens</p>
            )}
          </div>

          <div className="enviar-mensagem d-flex px-3">
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
    </div>
  );
}

export default Messages;
