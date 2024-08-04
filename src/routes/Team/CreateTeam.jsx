import stocotoonAPI from '../../axios/config';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/User';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';

function CreateTeam() {
  
    const navigate = useNavigate();

    const { session, setSession } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const team = {
            name,
            description,
            UserId: session.UserId
        }
        try {
            await stocotoonAPI.post("/team/create", team, {
                headers: {
                    Authorization: `Bearer ${session.UserToken}`
                }
            });
            navigate(`/dashboard/${session.UserId}`);
        } 
        catch (error) {
            setMessage(error.response.data.message);
        }
    }

  return (
    <Form
      setName={setName}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      title="Criar Equipe"
      nameLabel="Nome da equipe"
      descriptionLabel="Descrição da equipe"
      namePlaceholder="Digite o nome da equipe"
      descriptionPlaceholder="Digite a descrição da equipe"
      hasDescription={true}
      message={message}
    ></Form>
  )
}

export default CreateTeam;