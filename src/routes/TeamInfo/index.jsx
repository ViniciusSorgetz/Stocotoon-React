import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import stocotoonAPI from '../../axios/config';
import { UserContext } from '../../contexts/User';

const TeamInfo = () => {

    const {session, setSession } = useContext(UserContext);
    const [teamInfo, setTeamInfo] = useState({});
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
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row mt-nav">
                <div className="col-4">
                    <h1 className="text-light">{teamInfo.name}</h1>
                </div>
                <div className="col-4">
                    <h1 className="text-light">B</h1>
                </div>
                <div className="col-4">
                    <h1 className="text-light">C</h1>
                </div>
            </div>
        </div>
    )
}

export default TeamInfo;