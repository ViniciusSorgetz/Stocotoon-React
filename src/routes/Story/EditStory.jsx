import stocotoonAPI from '../../axios/config';

import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/User';
import { useNavigate } from 'react-router-dom';
import Form from "../../components/Form";

function EditStory() {
    const navigate = useNavigate();

    const { session, setSession } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let storyId = window.location.href;
        storyId = storyId.split('/')[5];
        const story = {
            name,
            description,
        }
        try {
            await stocotoonAPI.post(`/story/${storyId}/edit`, story, {
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
            setName={setName} name={name}
            setDescription={setDescription} description={description}
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

export default EditStory;