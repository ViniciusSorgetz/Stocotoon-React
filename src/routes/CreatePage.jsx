import stocotoonAPI from "../axios/config";

import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

function CreatePage() {
  const navigate = useNavigate();

  const { session, setSession } = useContext(UserContext);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chapterId = window.location.href;
    chapterId = chapterId.split("/")[5];
    console.log(chapterId);
    const page = {
      name,
      ChapterId: chapterId,
    };
    try {
      await stocotoonAPI.post("/page/create", page, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      navigate(`/chapter/${chapterId}`);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Form
      setName={setName}
      handleSubmit={handleSubmit}
      title="Criar Página"
      nameLabel="Nome da página"
      namePlaceholder="Digite o nome da página"
      hasDescription={false}
      message={message}
    >
    </Form>
  );
}

export default CreatePage;
