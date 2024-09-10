import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import stocotoonAPI from '../../axios/config';
import { UserContext } from '../../contexts/User';

import TeamPhoto from '../../assets/TeamPhoto.svg';
import Options from '../../assets/Options.svg';
import MemberPhoto from '../../assets/MemberPhoto.svg';
import './TeamInfo.css';

const TeamInfo = () => {

    const {session, setSession } = useContext(UserContext);
    const [teamInfo, setTeamInfo] = useState(null);
    const { TeamId } = useParams();
    const [addMemberInput, setAddMemberInput] = useState(false);
    const [removeMemberInput, setRemoveMemberInput] = useState(false);
    const [memberEmail, setMemberEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    
    const [editMode, setEditMode] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [message2, setMessage2] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const resp = await stocotoonAPI.get(`/team/${TeamId}/all`, {headers: {
                Authorization: `Bearer ${session.UserToken}`
            }});
            setTeamInfo(resp.data);
            console.log(resp.data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const addMember = async (e) => {
        e.preventDefault();
        try {
            const resp = await stocotoonAPI.post("/team/addMember", {TeamId: TeamId, email: memberEmail}, {
                headers: {Authorization: `Bearer ${session.UserToken}`}
            });
            setMessage(resp.data.message);
            setErrorMessage("");
            setMemberEmail("");
            setAddMemberInput(false);
            setTimeout(() => {
                setMessage("");
            }, 2000);
            const updatedTeamInfo = {...teamInfo};
            const updatedMembers = [...updatedTeamInfo.members.members, resp.data.member];
            updatedTeamInfo.members.members = updatedMembers;
            setTeamInfo(updatedTeamInfo); 
        } 
        catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    }

    const removeMember = async (e) => {
        e.preventDefault();
        try {
            const resp = await stocotoonAPI.post("/team/removeMember", {TeamId: TeamId, email: memberEmail}, {
                headers: {Authorization: `Bearer ${session.UserToken}`}
            });
            setMessage(resp.data.message);
            setErrorMessage("");
            setMemberEmail("");
            setRemoveMemberInput(false);
            setTimeout(() => {
                setMessage("");
            }, 2000);
            const updatedTeamInfo = {...teamInfo};
            const updatedMembers = updatedTeamInfo.members.members.filter(member => 
                member.email != memberEmail
            );
            updatedTeamInfo.members.members = updatedMembers;
            setTeamInfo(updatedTeamInfo); 
        } 
        catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    }

    const editTeamInfo = async (e) => {
        e.preventDefault();
        if(teamInfo.name === teamName && teamInfo.description === teamDescription){
            setEditMode(false);
            return;
        }
        try {
            const resp = await stocotoonAPI.put(`/team/${TeamId}`, {
                name: teamName,
                description: teamDescription
            }, {
                headers: {Authorization: `Bearer ${session.UserToken}`}
            });
            setTeamInfo(prev => ({...prev, name: teamName, description: teamDescription}));
            setEditMode(false);
            setMessage2(resp.data.message);
            setTimeout(() => {
                setMessage2("");
            }, 2000);
        } 
        catch (error) {
            setErrorMessage2(error.response.data.message);
        }
    }

    return (
        <div className="container w-100">
            {teamInfo && 
            <div className="row mt-nav gap-5">
                <div className="col-12 col-lg-6 mb-0 mb-5">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex w-100 justify-content-center">
                            <img src={TeamPhoto}/>
                        </div>
                        <div className="dropdown">
                            <img src={Options} style={{scale: "0.8", cursor: "pointer"}}data-bs-toggle="dropdown" aria-expanded="false">
                            </img>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end p-1 mt-2" id="members-dropdown">
                                <li 
                                    className="dropdown-item d-flex justify-content-between"
                                    onClick={() => {
                                        setEditMode(true);
                                        setTeamName(teamInfo.name);
                                        setTeamDescription(teamInfo.description);
                                    }}
                                >
                                    <span>Editar</span>
                                    <i className="bi bi-pencil"></i>
                                </li>
                                <li className="dropdown-item d-flex justify-content-between text-danger">
                                    <span>Excluir</span>
                                    <i className="bi bi-trash"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!editMode 
                    ?   <>
                            {message2.length > 0 && <p className="text-light">{message2}</p>}
                            <h1 className="font-grand text-cyan font-bold">{teamInfo.name}</h1>
                            {teamInfo.description ? 
                                <p className="text-light mb-5">{teamInfo.description}</p> :
                                <p className="text-light mb-5">Insira a descrição da equipe aqui.</p>
                            }
                        </>
                    :   <form className="my-form m-0 mb-3" onSubmit={editTeamInfo}>
                            <div className="form-item">
                                <label htmlFor="name" className='text-light'>Nome da Equipe</label>
                                <input 
                                    type="text" 
                                    className="bg-gray1 text-light"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="name" className='text-light'>Descrição da Equipe</label>
                                <textarea 
                                    type="text" 
                                    className="bg-gray1 text-light"
                                    value={(teamDescription)}
                                    onChange={(e) => setTeamDescription(e.target.value)}
                                    rows={5}
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn-cyan">Salvar</button>
                                <button 
                                    type="button" 
                                    className="btn-outline-gray"
                                    onClick={() => {
                                        setEditMode(false);
                                        setErrorMessage2("");
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                            {errorMessage2.length > 0 && <p className="text-danger pt-3">{errorMessage2}</p>}
                        </form>
                    }
                    <div className="row d-flex">
                        <p className="text-light">Esta equipe contém:</p>
                        <div className="col-4">
                            <h3 className="text-light font-bold text-center h2">
                                {String(teamInfo.amount.stories).padStart(2, "0")}
                            </h3>
                            <p className="text-light text-center">Histórias</p>
                        </div>
                        <div className="col-4">
                            <h3 className="text-light font-bold text-center h2">
                                {String(teamInfo.amount.chapters).padStart(2, "0")}
                            </h3>
                            <p className="text-light text-center">Capítulos</p>
                        </div>
                        <div className="col-4">
                            <h3 className="text-light font-bold text-center h2">
                                {String(teamInfo.amount.pages).padStart(2, "0")}
                            </h3>
                            <p className="text-light text-center">Páginas</p>
                        </div>
                    </div>
                </div>
                <div className="members-container col-12 col-lg-5">
                    <div className="d-flex justify-content-between">
                        <h3 className="font-grand text-cyan font-bold">Integrantes da equipe</h3>
                        <div className="dropdown">
                            <img src={Options} style={{scale: "0.8", cursor: "pointer"}}data-bs-toggle="dropdown" aria-expanded="false">
                            </img>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end py-1 mt-2" id="members-dropdown">
                                <li 
                                    className="dropdown-item d-flex gap-2"
                                    onClick={() => {
                                        setAddMemberInput(true);
                                        setRemoveMemberInput(false);
                                        setErrorMessage("");
                                    }}
                                >
                                    <span >Adicionar membro</span>
                                    <i class="bi bi-plus-circle-dotted"></i>
                                </li>
                                <li 
                                    className="dropdown-item d-flex gap-2"
                                    onClick={() => {
                                        setRemoveMemberInput(true);
                                        setAddMemberInput(false);
                                        setErrorMessage("");
                                    }}
                                >
                                    <span className="text-danger">Remover membro</span>
                                    <i class="bi bi-dash-circle-dotted text-danger"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {(addMemberInput || removeMemberInput) && 
                        <form 
                            onSubmit={addMemberInput ? addMember : removeMember} 
                            className="my-form m-0 mb-3"
                        >
                            <div className="form-item">
                                <label htmlFor="name" className='text-light'>E-mail</label>
                                <input 
                                    type="email" 
                                    className="bg-gray1 text-light" 
                                    placeholder="E-mail do membro"
                                    value={memberEmail}
                                    onChange={(e) => setMemberEmail(e.target.value)}
                                />
                            </div>
                            <div className="d-flex gap-2">
                                {addMemberInput 
                                ? <button type="submit" className="btn-cyan">Adicionar</button>
                                : <button type="submit" className="btn btn-sm btn-danger">Remover</button>
                                }
                                <button 
                                    type="button" 
                                    className="btn-outline-gray"
                                    onClick={() => {
                                        setAddMemberInput(false);
                                        setRemoveMemberInput(false);
                                        setMemberEmail("");
                                        setErrorMessage("");
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                            {errorMessage.length !== 0 && <p className="text-danger error-message mt-2">{errorMessage}</p>}
                        </form>
                    }
                    {message.length !== 0 && <p className="text-light mt-2">{message}</p>}
                    <p className="text-light font-grand font-bold lead">Dono</p>
                    <ul>
                        {teamInfo.members.owners.map(owner => (
                            <li className="d-flex gap-2">
                                <img src={MemberPhoto}/>
                                <div className="d-flex flex-column">
                                    <span className="text-light font-bold">{owner.name}</span>
                                    <span className="text-light">{owner.email}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {teamInfo.members.members.length > 0 && <>
                            <p className="text-light font-grand font-bold lead">Membros</p>
                            <ul className="d-flex flex-column gap-3">
                            {teamInfo.members.members.map(member => (
                                <li className="d-flex gap-2">
                                    <img src={MemberPhoto}/>
                                    <div className="d-flex flex-column">
                                        <span className="text-light font-bold">{member.name}</span>
                                        <span className="text-light">{member.email}</span>
                                    </div>
                                </li>
                            ))}
                            </ul>
                    </>}
                </div>
            </div>
            }
        </div>
    )
}

export default TeamInfo;