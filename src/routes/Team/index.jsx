import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { Link } from "react-router-dom";
import stocotoonAPI from "../../axios/config";

import FormModal from "../../components/FormModal";
import Item from "../../components/Item";
import StoryIcon from "../../assets/StoryIcon.svg";
import CreateItem from "../../components/CreateItem";

function Team() {

  const { session, setSession } = useContext(UserContext);
  const [stories, setStories] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [storyId, setStoryId] = useState(null);
  const [modal, setModal] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [createMode, setCreateMode] = useState(false);

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
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModal(false);
    setName("");
    setDescription("");
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
    console.log("editando...")
    const story = {
      name,
      description,
      TeamId: teamId
    } 
    try {
      const resp = await stocotoonAPI.put(`/story/${storyId}/edit`, story, {
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

  return (
    <div className="container pb-5 mt-nav">
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
      <h1 className="text-light text-center pb-5 font-grand font-bold">
        Histórias da equipe
      </h1>
      {stories !== null && (
        <div className="row">
          {stories.map((story) => (
            <Item 
              name={"story"} 
              type={story} 
              icon={StoryIcon}
              handleClick={() => {
                setName(story.name)
                setDescription(story.description)
                setStoryId(story.id)
                setCreateMode(false)
                setModal(true)}}
            />
          ))}
          <CreateItem handleClick={() => {
            setCreateMode(true)
            setModal(true)}}/>
        </div>
      )}
    </div>
  );
}

export default Team;
