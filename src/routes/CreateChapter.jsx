import stocotoonAPI from "../axios/config";

import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function CreateChapter() {
  const navigate = useNavigate();

  const { session, setSession } = useContext(UserContext);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let storyId = window.location.href;
    storyId = storyId.split("/")[5];
    console.log(storyId);
    const chapter = {
      name,
      StoryId: storyId,
    };
    try {
      await stocotoonAPI.post("/chapter/create", chapter, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      navigate(`/story/${storyId}`);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Form
      setName={setName}
      handleSubmit={handleSubmit}
      title="Criar Capítulo"
      nameLabel="Nome do capítulo"
      namePlaceholder="Digite o nome do capítulo"
      hasDescription={false}
      message={message}
    >
    </Form>
  );
}

export default CreateChapter;
