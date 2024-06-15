import stocotoonAPI from '../axios/config';

import { UserContext } from '../contexts/User';
import {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TeamIcon from '../assets/TeamIcon.svg';
import Criar from '../assets/Criar.svg';
import './Dashboard.css';

export const Dashboard = () => {

    const { session, setSession } = useContext(UserContext);
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);

    if(!session){
        navigate("/");
        return <h2 className="text-light p-5 text-center">Sem sessão</h2>;
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const data = await stocotoonAPI.get(`/team/${session.UserId}`, {
                headers: {
                    Authorization: `Bearer ${session.UserToken}`,
                },
            });
            setTeams(data.data);
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="container pb-5">
        <h1 className="text-light text-center pb-5 font-grand font-bold">Suas equipes</h1>
        {teams.length === 0 ? (
            <p>Carregando...</p>
        ): 
        (<div className="row">
           {teams.map(team => (
                <div className="col col-lg-2 col-sm-4">
                    <div className="team">
                        <h2 className="text-light h6 pb-2">{team.name}</h2>
                        <img src={TeamIcon} alt="TeamIcon" />
                    </div>
                </div>
           ))} 
           <div className="col col-lg-2 col-sm-4">
                    <div className="team">
                        <h2 className="text-light h6 pb-2">Criar equipe</h2>
                        <Link to={`/${session.UerId}/dashboard/criar`}>
                            <img src={Criar} alt="Criar" />
                        </Link>
                    </div>
                </div>
        </div>)}
    </div>
  )
}

export default Dashboard;