import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import stocotoonAPI from "../../axios/config";
import { UserContext } from "../../contexts/User";
import { ChatContext } from "../../contexts/ChatContext";
import { io } from "socket.io-client";

import SidebarTimes from "./SidebarTimes";
import SidebarChats from "./SidebarChats";
import Messages from "./Messages";

const Chat = () => {
  const { session } = useContext(UserContext);
  const { team } = useContext(ChatContext);
  const [teams, setTeams] = useState([]);
  // const [team, setTeam] = useState({});

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

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
    <div className="father-container d-flex flex-row">
      <SidebarTimes teams={teams} />
      <SidebarChats teams={teams} />
      <Messages />
    </div>
  );
};

export default Chat;
