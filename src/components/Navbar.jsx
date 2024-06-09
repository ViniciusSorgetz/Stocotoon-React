import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

const Navbar = () => {

  const [session, setSession] = useState({});

    useEffect(() => {
      setSession(JSON.parse(localStorage.getItem("session")));
    }, []);

    const sair = () => {
      localStorage.removeItem("session");
    }

  return (
    <nav className="navbar navbar-expand-md fixed-top bg-gray1 border-bottom border-secondary font-inter" id="stocotoon-navbar">
        <div className="container ">
          <Link to={"/"} className="navbar-brand text-cyan font-grand font-bold" id="navbar-logo">Stocotoon</Link>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navagation" id="menu-icon">
                <img src="css/images/menu_FILL0_wght400_GRAD0_opsz24.svg" alt="menu"/>
          </button>
          <div className="collapse navbar-collapse text-center gap-3" id="nav">
                <ul className="navbar-nav gap-md-2 gap-lg-5 gap-3 mx-auto">
                      <li className="nav-item pages-link">
                            <Link to={"/"} className="nav-link text-light">
                                Início
                            </Link>
                      </li>
                      <li className="nav-item pages-link">
                            <Link to={"/"} className="nav-link text-light">
                                Tutorial
                            </Link>
                      </li>
                      <li className="nav-item pages-link">
                            <Link to={"/"} className="nav-link text-light">
                                Sobre nós
                            </Link>
                      </li>
                </ul>
                <div className="navbar-buttons navbar-nav gap-3 my-md-0 my-3 d-flex align-items-center">
                        {!session ? (
                          <>
                            <Link to={"/entrar"} className="btn-outline-cyan">
                              Entrar
                            </Link>
                            <Link to={"/cadastro"} className="btn-cyan">
                              Inscrever-se
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to={"/"} className="btn-outline-cyan" onClick={() => sair()("AAA")}>
                              Sair
                            </Link>
                            <Link to={"/"} className="nav-link text-light">
                              {session.UserName}
                            </Link>
                          </>
                        )}  
                </div>
          </div>
        </div>
    </nav>
  )
    
}

export default Navbar