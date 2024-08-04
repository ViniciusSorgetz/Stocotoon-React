import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { Link } from "react-router-dom";
import stocotoonAPI from "../../axios/config";

import FormModal from "../../components/FormModal";
import Criar from "../../assets/Criar.svg";
import StoryIcon from "../../assets/StoryIcon.svg";

function Team() {

  const { session, setSession } = useContext(UserContext);
  const [stories, setStories] = useState(null);
  const [teamId, setTeamId] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let TeamId = window.location.href;
    TeamId = TeamId.split("/")[4];
    try {
      const data = await stocotoonAPI.get(`/team/${TeamId}`, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      setStories(data.data.stories);
      setTeamId(TeamId);
      console.log(data.data.stories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pb-5 mt-nav">
      {modal && <FormModal/>}
      <h1 className="text-light text-center pb-5 font-grand font-bold">
        Histórias da equipe
      </h1>
      {stories !== null && (
        <div className="row">
          {stories.map((story) => (
            <div className="col col-lg-2 col-sm-4 pb-5" key={story.id}>
              <div className="component">
                <h2 className="text-light h6">{story.name}</h2>
                <Link to={`/story/${story.id}`} state={{ story: story.name }}>
                  <img src={StoryIcon} alt="TeamIcon" />
                </Link>
              </div>
            </div>
          ))}
          <div className="col col-lg-2 col-sm-4 pb-5">
            <div className="component" onClick={() => setModal(true)}>
              <h2 className="text-light h6">Criar história</h2>
                <img src={Criar} alt="Criar" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;
