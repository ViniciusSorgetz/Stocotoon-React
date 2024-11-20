import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { Link } from "react-router-dom";
import stocotoonAPI from "../../axios/config";

import FormModal from "../../components/FormModal";
import Item from "../../components/Item";
import TeamIcon from "../../assets/TeamIcon.svg";
import CreateItem from "../../components/CreateItem";
import ItemContextMenu from "../../components/ItemContextMenu";

function Team() {

  const {session, setSession } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState({});
  const [teamId, setTeamId] = useState(null);
  const [userId, setUserId] = useState(null);
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
    let UserId = window.location.href;
    UserId = UserId.split("/")[4];
    try {
      const data = await stocotoonAPI.get(`/user/${UserId}`, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      setTeams(data.data.teams);
      setUserId(UserId);
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

  const createTeam = async () => {
    const team = {
        name,
        description,
        UserId: userId
    }
    try {
        const resp = await stocotoonAPI.post("/team/create", team, {
            headers: {
                Authorization: `Bearer ${session.UserToken}`
            }
        });
        setTeams(prevTeams => [...prevTeams, resp.data.team]);
        closeModal();
    }
    catch (error) {
        setMessage(error.response.data.message);
    }
  } 

  const editTeam = async () => {
    const team = {
      name,
      description,
      TeamId: teamId
    } 
    try {
      const resp = await stocotoonAPI.put(`/team/${teamId}`, team, {
        headers: {
            Authorization: `Bearer ${session.UserToken}`
        }
      });
      const index = teams.findIndex(team => team.id === teamId);
      const updatedTeams = [...teams];
      updatedTeams[index] = resp.data.team;
      setTeams(updatedTeams);
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
          type={currentTeam}
          updateId={() => setTeamId(currentTeam.id)}
          handleClick={() => {
            setName(currentTeam.name)
            setDescription(currentTeam.description)
            setTeamId(currentTeam.id)
            setCreateMode(false)
            setModal(true)}}
        />
      }
      {modal && <FormModal 
        hide={closeModal}
        setName={setName} name={name}
        setDescription={setDescription} description={description}
        handleSubmit={createMode ? createTeam : editTeam}
        title={createMode ? "Criar equipe" : "Editar equipe"}
        nameLabel="Nome da equipe"
        descriptionLabel="Descrição da equipe"
        namePlaceholder="Digite o nome da equipe"
        descriptionPlaceholder="Digite a descrição da equipe"
        hasDescription={true}
        message={message}
        button={createMode ? "Criar" : "Editar"}
      />}
      <h1 className="text-light text-center pb-5 font-grand font-bold">
        Suas equipes
      </h1>
      <div className="row">
        {teams.map((team) => (
          <Item 
            name={"team"} 
            setName={setName}
            type={team} 
            icon={TeamIcon}
            setPositionX={setPositionX}
            setPositionY={setPositionY}
            setContextMenu={setContextMenu}
            setCurrentItem={setCurrentTeam}
          />
        ))}
        <CreateItem name={"equipe"} handleClick={() => {
          setCreateMode(true)
          setModal(true)}}/>
      </div>
    </div>
  );
}

export default Team;
