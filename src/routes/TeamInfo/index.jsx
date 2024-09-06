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

    return (
        <div className="container w-75">
            {teamInfo && 
            <div className="row mt-nav gap-5">
                <div className="col-12 col-lg-6 mb-0 mb-5">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex w-100 justify-content-center">
                            <img src={TeamPhoto}/>
                        </div>
                        <img src={Options} style={{scale: "0.8", cursor: "pointer"}}/>
                    </div>
                    <h1 className="font-grand text-cyan font-bold">{teamInfo.name}</h1>
                    {teamInfo.description ? 
                        <p className="text-light mb-5">{teamInfo.description}</p> :
                        <p className="text-light mb-5">Insira a descrição da equipe aqui.</p>
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
                        <img src={Options} style={{scale: "0.8", cursor: "pointer"}}/>
                    </div>
                    <p className="text-light font-grand font-bold lead">Dono</p>
                    <ul>
                        {teamInfo.members.owners.map(owner => (
                            <li className="d-flex gap-2">
                                <img src={MemberPhoto}/>
                                <div className="d-flex flex-column">
                                    <span className="text-light font-bold">{owner.name}</span>
                                    <span className="text-light">dono</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="text-light font-grand font-bold lead">Membros</p>
                    <ul>
                        {teamInfo.members.members.map(member => (
                            <li className="d-flex gap-2">
                                <img src={MemberPhoto}/>
                                <div className="d-flex flex-column">
                                    <span className="text-light font-bold">{member.name}</span>
                                    <span className="text-light">membro</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            }
        </div>
    )
}

export default TeamInfo;