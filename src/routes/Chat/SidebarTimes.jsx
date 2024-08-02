import "./chat.css";
import TeamIcon from "../../assets/TeamIcon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

function SidebarTimes({ teams }) {

  const { team, setTeam } = useContext(ChatContext);

  return (
    <div className="sidebar-time d-flex flex-column flex-shrink-0 bg-cinza">
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        {teams.map((team) => (
          <li className="nav-item" key={team.id} onClick={() => setTeam(team)}>
            <Link
              to={`/chat/${team.name}`}
              className="nav-link py-3 border-bottom rounded-0"
            >
              <img src={TeamIcon} alt="Icone do time" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarTimes;
