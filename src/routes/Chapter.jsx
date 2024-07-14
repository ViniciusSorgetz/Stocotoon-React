import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { Link } from 'react-router-dom';
import stocotoonAPI from '../axios/config';

import Criar from '../assets/Criar.svg';
import Page from '../assets/Page.svg';

function Chapter(){

    const { session, setSession } = useContext(UserContext);
    const [ pages, setPages ] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let chapterId = window.location.href;
        chapterId = chapterId.split('/')[4];
        try {
            const data = await stocotoonAPI.get(`/page/${chapterId}`, {
                headers: {
                    Authorization: `Bearer ${session.UserToken}`,
                }
            });
            setPages(data.data);
            console.log(data.data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container pb-5">
            <h1 className="text-light text-center pb-5 font-grand font-bold">Páginas do Capítulo</h1>
            {pages !== null && 
                <div className="row">
                {pages.map(page => (
                    <div className="col col-lg-2 col-sm-4 pb-5">
                        <div className="component">
                            <h2 className="text-light h6">{page.name}</h2>
                            <Link to={`/drawingApp/${page.id}`}>
                                <img src={Page} alt="TeamIcon"/>
                            </Link>
                        </div>
                    </div>
                ))} 
                    <div className="col col-lg-2 col-sm-4 pb-5">
                            <div className="component">
                                <h2 className="text-light h6">Criar página</h2>
                                <Link to={`/`}>
                                    <img src={Criar} alt="Criar"/>
                                </Link>
                            </div>
                    </div>
                </div>}
        </div>
      );
}

export default Chapter;