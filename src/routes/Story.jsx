import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { Link, useLocation } from "react-router-dom";
import stocotoonAPI from "../axios/config";

import Criar from "../assets/Criar.svg";
import ChapterIcon from "../assets/ChapterIcon.svg";

function Story() {
  const { session, setSession } = useContext(UserContext);
  const [chapters, setChapters] = useState(null);
  const [storyId, setStoryId] = useState();

  // const location = useLocation();
  // const { story } = location.state;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let storyId = window.location.href;
    storyId = storyId.split("/")[4];
    setStoryId(storyId);
    try {
      const data = await stocotoonAPI.get(`/story/${storyId}`, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      setChapters(data.data.chapters);
      console.log(data.data.chapters);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pb-5">
      <h1 className="text-light text-center pb-5 font-grand font-bold">
        Capítulos da história
      </h1>
      {chapters !== null && (
        <div className="row">
          {chapters.map((chapter) => (
            <div className="col col-lg-2 col-sm-4 pb-5" key={chapter.id}>
              <div className="component">
                <h2 className="text-light h6"> {chapter.name} </h2>
                <Link to={`/chapter/${chapter.id}`}>
                  <img src={ChapterIcon} alt="Criar" />
                </Link>
              </div>
            </div>
          ))}
          <div className="col col-lg-2 col-sm-4 pb-5">
            <div className="component">
              <h2 className="text-light h6">Criar capítulo</h2>
              <Link to={`/chapter/criar/${storyId}`}>
                <img src={Criar} alt="Criar" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Story;
