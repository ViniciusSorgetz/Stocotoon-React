import "./chat.css";
import TeamIcon from "../../assets/TeamIcon.svg";
import { Link } from "react-router-dom";

function SidebarTimes({ teams }) {
  return (
    <div class="sidebar-time d-flex flex-column flex-shrink-0 bg-preto">
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        {teams.map((team) => (
          <li class="nav-item">
            <Link
              to={`/chat/${team.name}/0`}
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
