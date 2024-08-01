import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import stocotoonAPI from "../../axios/config";
import { UserContext } from "../../contexts/User";
import { io } from "socket.io-client";

import SidebarTimes from "./SidebarTimes";
import SidebarChats from "./SidebarChats";

const Chat = () => {
  const { session } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({});
  const [socket, setSocket] = useState(null);

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!location.pathname.includes("chat")) return;
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  }, [location]);

  const getData = async () => {
    const { data } = await stocotoonAPI.get(`/user/${session.UserId}`, {
      headers: {
        Authorization: `Bearer ${session.UserToken}`,
      },
    });
    setTeams(data.teams);
    getChats(data.teams);
  };

  const getChats = async (teams) => {
    const newTeams = await Promise.all(
      teams.map(async (team, index, array) => {
        const { data } = await stocotoonAPI.get(`/team/${team.id}`, {
          headers: {
            Authorization: `Bearer ${session.UserToken}`,
          },
        });
        return {
          ...team,
          chats: [...data.chats],
        };
      })
    );
    setTeams(newTeams);
  };

  return (
    <div>
      <SidebarTimes teams={teams} />
      <SidebarChats />
      <div>
        <p className="text-light">Lista de times</p>
        <ul>
          {teams.map((team) => (
            <li className="text-light" onClick={() => setTeam(team)}>
              {team.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-light">Lista de chats</p>
        {team.chats && (
          <ul>
            {team.chats.map((chat) => (
              <li>{chat.name}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => console.log(teams)}>Console.log</button>
    </div>
  );
};

export default Chat;
