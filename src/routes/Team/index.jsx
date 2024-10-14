import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { Link } from "react-router-dom";
import stocotoonAPI from "../../axios/config";

import FormModal from "../../components/FormModal";
import Item from "../../components/Item";
import StoryIcon from "../../assets/StoryIcon.svg";
import TeamPhoto from "../../assets/TeamPhoto.svg";
import ComeBack from "../../assets/ComeBack.svg"
import CreateItem from "../../components/CreateItem";
import ItemContextMenu from "../../components/ItemContextMenu";

function Team() {

  const {session, setSession } = useContext(UserContext);
  const [stories, setStories] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [currentStory, setCurrentStory] = useState({});
  const [teamId, setTeamId] = useState(null);
  const [storyId, setStoryId] = useState(null);
  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [createMode, setCreateMode] = useState(false);

  const [contextMenu, setContextMenu] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0)

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
      setTeamName(data.data.name);
      setTeamId(TeamId);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModal(false);
    setName("");
    setDescription("");
    setMessage("");
  }

  const createStory = async () => {
    let teamId = window.location.href;
    teamId = teamId.split('/')[4];
    const story = {
        name,
        description,
        TeamId: teamId
    }
    try {
        const resp = await stocotoonAPI.post("/story/create", story, {
            headers: {
                Authorization: `Bearer ${session.UserToken}`
            }
        });
        setStories(prevStories => [...prevStories, resp.data.story]);
        closeModal();
    }
    catch (error) {
        setMessage(error.response.data.message);
    }
  } 

  const editStory = async () => {

    const story = {
      name,
      description,
      TeamId: teamId
    } 
    try {
      const resp = await stocotoonAPI.put(`/story/${storyId}`, story, {
        headers: {
            Authorization: `Bearer ${session.UserToken}`
        }
      });
      const index = stories.findIndex(story => story.id === storyId);
      const updatedStories = [...stories];
      updatedStories[index] = resp.data.story;
      setStories(updatedStories);
      closeModal();
    } 
    catch (error) {
      setMessage(error.response.data.message);
    }
  }

  const deleteStory = async () => {

    try {
      await stocotoonAPI.delete(`/story/${storyId}`, {
        headers: {
            Authorization: `Bearer ${session.UserToken}`
        }
      });
      const updatedStories = stories.filter(story => story.id != storyId);
      setStories(updatedStories);
      closeModal();
    } 
    catch (error) {
      setMessage(error.response.data.message);
    }
  }

  return (
    <div className="container pb-5 mt-nav">
      {contextMenu && 
        <ItemContextMenu
          setContextMenu={setContextMenu}
          positionX={positionX}
          positionY={positionY}
          name={"team"}
          type={currentStory}
          updateId={() => setStoryId(currentStory.id)}
          handleClick={() => {
            setName(currentStory.name)
            setDescription(currentStory.description)
            setStoryId(currentStory.id)
            setCreateMode(false)
            setModal(true)}}
          handleDelete={deleteStory}
        />
      }
      {modal && <FormModal 
        hide={closeModal}
        setName={setName} name={name}
        setDescription={setDescription} description={description}
        handleSubmit={createMode ? createStory : editStory}
        title="Criar História"
        nameLabel="Nome da história"
        descriptionLabel="Descrição da história"
        namePlaceholder="Digite o nome da história"
        descriptionPlaceholder="Digite a descrição da história"
        hasDescription={true}
        message={message}
        button={createMode ? "Criar" : "Editar"}
      />}
      <div className="d-flex justify-content-center mb-3">
        <div className="w-50 d-flex justify-content-center align-items-start">
          <img src={TeamPhoto}/>
            <Link to={`/team/${teamId}/info`}>
              <img 
                src={ComeBack}
                style={{
                  padding: "none",
                  transform: "scaleX(-1)",
                  cursor: "pointer"
                }}  
              />
            </Link>
        </div>
      </div>
      <h1 className="text-light text-center pb-5 font-grand font-bold">
        {teamName}
      </h1>
      <div className="row">
        {stories.map((story) => (
          <Item 
            name={"story"} 
            setName={setName}
            type={story} 
            icon={StoryIcon}
            setPositionX={setPositionX}
            setPositionY={setPositionY}
            setContextMenu={setContextMenu}
            setCurrentItem={setCurrentStory}
          />
        ))}
        <CreateItem name={"história"} handleClick={() => {
          setCreateMode(true)
          setModal(true)}}/>
      </div>
    </div>
  );
}

export default Team;
