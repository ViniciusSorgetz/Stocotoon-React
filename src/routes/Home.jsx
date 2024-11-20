import React from "react";
import squares from "../assets/Squares.svg";
import rectangle1 from "../assets/Rectangle1.svg";
import rectangle2 from "../assets/Rectangle2.svg";
import rectangle3 from "../assets/Rectangle3.svg";
import HomeImage01 from '../assets/HomeImage01.png';
import Function01 from '../assets/Function01.svg';
import Function02 from '../assets/Function02.svg';
import Function03 from '../assets/Function03.svg';
import Function04 from '../assets/Function04.svg';
import Tour01 from '../assets/Tour01.png';
import Tour02 from '../assets/Tour02.png';
import Tour03 from '../assets/Tour03.png';
import Card01 from '../assets/Card01.png';
import Card02 from '../assets/Card02.png';
import Card03 from '../assets/Card03.png';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mt-nav">
      <section>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-light font-grand font-bold display-5">
                <span className="text-cyan">Stocotoon</span>,<br /> a ferramenta
                para{" "}
                <span className="text-cyan">
                  <br />
                  storyboards
                </span>{" "}
                de <span className="text-cyan">HQs</span>
              </h1>
              <p className="text-light font-inter">
                Olá, este é o Stocotoon! Convidamos você a conferir todas as funcionalidades presentes em nosso site focado para o desenvolvimento de Storyboards de Histórias em Quadrinhos!
              </p>
              <button className="btn-cyan font-inter font-bold text-gray1">
                <Link to={"/cadastro"} style={{ textDecoration: 'none', color: 'inherit' }}>Começar</Link>
              </button>
            </div>
            <div className="col-md-6 my-lg-0 mt-5 d-flex justify-content-center">
              <img src={HomeImage01} alt="squares" style={{width: "400px", height: "300px"}}/>
            </div>
          </div>
        </div>
      </section>

      {/* LINHA 02 - CARDS */}

      <section className="bg-gray2 p-5">
        <div className="container">
          <h2 className="display-5 my-lg-3 font-grand text-light font-bold text-center">
            Suas <label className="text-cyan mb-5">funcionalidades</label>
          </h2>
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Organize seus Projetos
                  </h4>
                  <img src={Function01} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Aqui é possível organizar seus projetos em histórias, capítulos e páginas!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Desenhe seus Storyboards
                  </h4>
                  <img src={Function02} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Você pode desenhar seu Storyboard em nossa ferramenta para desenhos!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Escreva seus Roteiros
                  </h4>
                  <img src={Function03} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Seja capaz de escrever seu roteiro junto de seu storyboard com nossa ferramenta de texto!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Converse com a
                    Equipe
                  </h4>
                  <img src={Function04} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Após entrar em uma equipe, participe do chat e discuta sobre o seu projeto!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TUOR */}

      <section className="pt-3 space-bottom" id="tuor">
        <div className="container">
          <h2 className="font-grand font-bold text-light  display-5 text-center py-5">
            Tuor
          </h2>
          <div className="row d-flex my-0 my-lg-5 align-items-center">
            <div className="col-md-6 col-lg-7">
              <img
                src={Tour01}
                className="img-fluid tuor-img"
                alt="Rectangle"
              />
            </div>
            <div className="col-lg-5 col-md-6 text-light font-inter my-md-0 my-4">
              <h3 className="h2 font-grand font-bold text-cyan">
                Página para Gerenciamento de Equipe
              </h3>
              <br />
              <p>
                Após criar sua equipe, é possível gerenciá-la, adicionando ou removendo membros em seu time. Nesta página também você poderá editar o nome e a descrição de sua equipe.{" "}
              </p>
              <p>
                Além disso, é possível visualizar os números dela, vendo quantas histórias, capítulos e páginas você e sua equipe já criaram.
              </p>
            </div>
          </div>
          <div className="row d-flex flex-row-reverse my-5 align-items-center">
            <div className="col-md-6 col-lg-7">
              <img
                src={Tour02}
                className="img-fluid tuor-img"
                alt="Rectangle"
              />
            </div>
            <div className="col-md-6 col-lg-5 text-light font-inter my-md-0 my-4">
              <h3 className="h2 font-grand font-bold text-cyan">
                Página para desenhar e escrever o roteiro do Storyboard da sua HQ
              </h3>
              <br />
              <p>
                Nesta página você será capaz de desenhar o seu storyboard, contando com diversas ferramentas que te permitem inserir texto, desenhar e redimencionar formas geométricas, um sistema de camadas completo e muito mais.{" "}
              </p>
              <p>
                Aproveite também e escreva seu roteiro, com o que precisa ter na cena a ser desenhada, contando com formatações que deixam toda a leitura bem mais fácil.
              </p>
            </div>
          </div>
          <div className="row d-flex my-5 align-items-center">
            <div className="col-md-6 col-lg-7">
              <img
                src={Tour03}
                className="img-fluid tuor-img"
                alt="Rectangle"
              />
            </div>
            <div className="col-md-6 col-lg-5 text-light font-inter my-md-0 my-4">
              <h3 className="h2 font-grand font-bold text-cyan">
                Página de Bate-Papo para equipes
              </h3>
              <br />
              <p>
                  Quando criar sua equipe, dê uma olhada na aba de chat localizada na barra de navegação do site. Lá, é possível conversar com os membros presentes nas equipes que você participa e, consequentemente, discutir os rumos do projeto.{" "}
              </p>
              <p>
                Altere entre as conversas de diferentes equipes facilmente com a barra lateral, que te permite visualizar melhor os chats que você está conversando e navegar mais facilmente entre eles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAT */}

      <section className="bg-gray2">
        <div className="container pb-5">
          <div className="row chat-row text-light">
            <div className="chat-card col-md-4 d-flex flex-column justify-content-center px-5 px-md-3">
              <img
                src={Card01}
                alt="rectangle"
                className="img-fluid chat-img"
              />
              <h3 className="font-grand font-bold py-3">
                Aba de Bate-Papo para Equipes
              </h3>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center px-5 px-md-3">
              <img
                src={Card02}
                alt="rectangle"
                className="img-fluid chat-img"
              />
              <h3 className="font-grand font-bold py-3">
                Sistema de Organização de Arquivos
              </h3>
            </div>
            <div className="chat-card col-md-4 d-flex flex-column justify-content-center px-5 px-md-3">
              <img
                src={Card03}
                alt="rectangle"
                className="img-fluid chat-img"
              />
              <h3 className="font-grand font-bold py-3">
                Ferramenta de Desenho com Várias Funções
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
