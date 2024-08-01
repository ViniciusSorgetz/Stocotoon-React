import stocotoonAPI from '../axios/config';

import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
    const navigate = useNavigate();

    const { session, setSession } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const criarEquipe = async (e) => {
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
    <div className="mb-5 mt-nav">
        <h2 className="text-center font-grand font-bold text-cyan">Criar Equipe</h2>
        <form className="my-form" onSubmit={(e) => criarEquipe(e)}>
        <div className="form-item">
          <label for="name"className="text-light">Nome da Equipe</label>
          <input type="text" className="bg-gray1 text-light" name="name" placeholder="Digite o nome da equipe" onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div className="form-item">
          <label for="description"className="text-light">Descrição <span className="text-secondary">(opcional)</span></label>
          <input type="text" className="bg-gray1 text-light" name="description" placeholder="Digite a descrição da equipe" onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <button type="submit" className="btn-cyan font-inter font-bold text-gray1">Criar</button>
        {message.length !== 0 && <p className="text-danger text-center lead">{message}</p>}
      </form>
    </div>
  )
}

export default CreateTeam;