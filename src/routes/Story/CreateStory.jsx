import stocotoonAPI from '../../axios/config';

import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/User';
import { useNavigate } from 'react-router-dom';
import Form from "../../components/Form";

function CreateStory() {
    const navigate = useNavigate();

    const { session, setSession } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let teamId = window.location.href;
        teamId = teamId.split('/')[5];
        console.log(teamId);
        const story = {
            name,
            description,
            TeamId: teamId
        }
        try {
            await stocotoonAPI.post("/story/create", story, {
                headers: {
                    Authorization: `Bearer ${session.UserToken}`
                }
            });
            navigate(`/team/${teamId}`);
        }
        catch (error) {
            setMessage(error.response.data.message);
        }
    }

    return(
        <Form
            setName={setName}
            setDescription={setDescription}
            handleSubmit={handleSubmit}
            title="Criar História"
            nameLabel="Nome da história"
            descriptionLabel="Descrição da história"
            namePlaceholder="Digite o nome da história"
            descriptionPlaceholder="Digite a descrição da história"
            hasDescription={true}
            message={message}
        >
        </Form>
    )
}

export default CreateStory;