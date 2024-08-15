import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import { Link } from "react-router-dom";
import stocotoonAPI from "../../axios/config";

import FormModal from "../../components/FormModal";
import Item from "../../components/Item";
import PageIcon from "../../assets/PageIcon.svg";
import CreateItem from "../../components/CreateItem";
import ItemContextMenu from "../../components/ItemContextMenu";

function Team() {

  const {session, setSession } = useContext(UserContext);
  const [pages, setPages] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [currentPage, setCurrentPage] = useState({});
  const [chapterId, setChapterId] = useState(null);
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
    let chapterId = window.location.href;
    chapterId = chapterId.split("/")[4];
    setChapterId(chapterId);
    try {
      const data = await stocotoonAPI.get(`/chapter/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      setPages(data.data.pages);
      setChapterName(data.data.name);
      console.log(data.data);
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

  const createPage = async () => {
    const page = {
        name,
        ChapterId: chapterId
    }
    try {
        const resp = await stocotoonAPI.post("/page/create", page, {
            headers: {
                Authorization: `Bearer ${session.UserToken}`
            }
        });
        setPages(prevPages => [...prevPages, resp.data.page]);
        closeModal();
    }
    catch (error) {
        setMessage(error.response.data.message);
    }
  } 

  const eidtPage = async () => {
    console.log("editando...")
  }

  return (
    <div className="container pb-5 mt-nav">
      {contextMenu && 
        <ItemContextMenu
          setContextMenu={setContextMenu}
          positionX={positionX}
          positionY={positionY}
          name={"drawingApp"}
          type={currentPage}
          handleClick={() => {
            setName(currentPage.name)
            setDescription(currentPage.description)
            setStoryId(currentPage.id)
            setCreateMode(false)
            setModal(true)}}
        />
      }
      {modal && <FormModal 
        hide={closeModal}
        setName={setName} name={name}
        setDescription={setDescription} description={description}
        handleSubmit={createMode ? createPage : eidtPage}
        title="Criar Página"
        nameLabel="Nome da página"
        descriptionLabel="Descrição da página"
        namePlaceholder="Digite o nome da página"
        descriptionPlaceholder="Digite a descrição da página"
        hasDescription={true}
        message={message}
        button={createMode ? "Criar" : "Editar"}
      />}
      <h1 className="text-light text-center pb-5 font-grand font-bold">
        {chapterName}
      </h1>
      <div className="row">
        {pages.map((page) => (
          <Item 
            name={"drawingApp"} 
            setName={setName}
            type={page} 
            icon={PageIcon}
            setPositionX={setPositionX}
            setPositionY={setPositionY}
            setContextMenu={setContextMenu}
            setCurrentItem={setCurrentPage}
          />
        ))}
        <CreateItem name={"página"} handleClick={() => {
          setCreateMode(true)
          setModal(true)}}/>
      </div>
    </div>
  );
}

export default Team;
