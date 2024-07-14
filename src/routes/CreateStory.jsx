import stocotoonAPI from '../axios/config';

import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate } from 'react-router-dom';

function CreateStory() {
    const navigate = useNavigate();

    const { session, setSession } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    
    const criarHistoria = async (e) => {
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
            navigate(`/team/${session.UserId}`);
        }
        catch (error) {
            setMessage(error.response.data.message);
        }
    }

    return(
        <div className='mb-5'>
            <h2 className="text-center font-grand font-bold text-cyan">Criar História</h2>
            <form className='my-form' onSubmit={(e) => criarHistoria(e)}>
                <div className='form-item'>
                    <label htmlFor="name" className='text-light'>Título da História</label>
                    <input type="text" className='bg-gray1 text-light' name="name" placeholder='Digite o título da história' onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className='form-item'>
                    <label htmlFor="description" className='text-light'>Descrição <span className="text-secondary">(opcional)</span> </label>
                    <input type="text" className='bg-gray1 text-light' name='description' placeholder='Digite a descrição da história' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button type='submit' className="btn-cyan font-inter font-bold text-gray1">Criar</button>
                {message.length !== 0 && <p className='text-danger text-center lead'>{message}</p>}
            </form>
        </div>
    )
}

export default CreateStory;