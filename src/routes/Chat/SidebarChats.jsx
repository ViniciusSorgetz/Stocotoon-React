import "./chat.css";
import "../../index.css";
import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";

function SidebarChats() {
  const { team, setChatId } = useContext(ChatContext);

  const [chats, setChats] = useState(null);

  // const { TeamName } = useParams();

  useEffect(() => {
    if (team !== null) {
      setChats(team.chats);
    }
    // else if(TeamName){
    //   const index = teams.findIndex((resp) => {return resp.name === TeamName});
    //   console.log(teams[index].chats);
    // }
    // console.log(teams.findIndex((resp) => {return resp.name === TeamName}))
  }, [team]);

  return (
    <div className="sidebar-chats d-flex flex-column flex-shrink-0 bg-preto p-3">
      {chats && chats.length !== null ? (
        <div>
          <p className="font-grand fw-bold text-light h4 mb-2">{team.name}</p>
          <ul className="nav nav-pills nav-flush flex-column mb-auto">
            {chats.map((chat) => (
              <Link
                to={`/chat/${team.name}/${chats.findIndex((resp) => {return resp === chat})}`}
                className="p-2 rounded-3 bg-light mb-3 text-dark text-decoration-none"
                key={chat.id}
                onClick={() => {setChatId(chat.id)}}
              >
                <li className="nav-item">
                  <p className="fw-bold m-0"> { chat.name } </p>
                  {/* <p className="m-0">
                    <span className="fw-bold">Vanessa: </span>Um dia desses a...
                  </p> */}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            display: "flex",
            color: "white",
            margin: "auto 0",
          }}
        >
          Nenhuma equipe selecionada
        </p>
      )}
    </div>
  );
}

export default SidebarChats;
