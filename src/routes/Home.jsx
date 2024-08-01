import React from "react";
import squares from "../assets/Squares.svg";
import rectangle1 from "../assets/Rectangle1.svg";
import rectangle2 from "../assets/Rectangle2.svg";
import rectangle3 from "../assets/Rectangle3.svg";

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
                Lorem, ipsum dolor sit{" "}
                <a href="#tuor" className="text-cyan font-bold">
                  tuor
                </a>{" "}
                consectetur adipisicing elit. Fuga nostrum accusamus ipsum illo
                odit maxime vel provident animi eligendi sapiente. Lorem ipsum
                dolor sit amet consectetur adipisicing elit.
              </p>
              <button className="btn-cyan font-inter font-bold text-gray1">
                Começar
              </button>
            </div>
            <div className="col-md-6 my-lg-0 mt-5 d-flex justify-content-center">
              <img src={squares} alt="squares" className="img-fluid" />
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
                    Organize seus Storyboards
                  </h4>
                  <img src={rectangle1} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                    reiciendis.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Organize seus Storyboards
                  </h4>
                  <img src={rectangle1} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                    reiciendis.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Organize seus Storyboards
                  </h4>
                  <img src={rectangle1} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                    reiciendis.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 my-3 my-lg-0">
              <div className="card py-2 tool-card">
                <div className="card-body">
                  <h4 className="card-title font-grand font-bold text-gray1 text-center">
                    Organize seus Storyboards
                  </h4>
                  <img src={rectangle1} className="w-100 my-2" alt="square" />
                  <p className="car-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                    reiciendis.
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
                src={rectangle2}
                className="img-fluid tuor-img"
                alt="Rectangle"
              />
            </div>
            <div className="col-lg-5 col-md-6 text-light font-inter my-md-0 my-4">
              <h3 className="h2 font-grand font-bold text-cyan">
                Lorem ipsum dolor sit amet. Est dolorum offi.
              </h3>
              <br />
              <p>
                Lorem ipsum dolor sit amet. Est dolorum officia qui numquam
                eveniet sit autem laboriosam ea sapiente earum hic sequi quam
                sit veniam deleniti ad modi obcaecati.{" "}
              </p>
              <p>
                Et consequuntur ipsa non perferendis incidunt non perferendis
                temporibus et quisquam iusto ut asperiores nesciunt et
                reiciendis inventore.
              </p>
            </div>
          </div>
          <div className="row d-flex flex-row-reverse my-5 align-items-center">
            <div className="col-md-6 col-lg-7">
              <img
                src={rectangle2}
                className="img-fluid tuor-img"
                alt="Rectangle"
              />
            </div>
            <div className="col-md-6 col-lg-5 text-light font-inter my-md-0 my-4">
              <h3 className="h2 font-grand font-bold text-cyan">
                Lorem ipsum dolor sit amet. Est dolorum offi.
              </h3>
              <br />
              <p>
                Lorem ipsum dolor sit amet. Est dolorum officia qui numquam
                eveniet sit autem laboriosam ea sapiente earum hic sequi quam
                sit veniam deleniti ad modi obcaecati.{" "}
              </p>
              <p>
                Et consequuntur ipsa non perferendis incidunt non perferendis
                temporibus et quisquam iusto ut asperiores nesciunt et
                reiciendis inventore.
              </p>
            </div>
          </div>
          <div className="row d-flex my-5 align-items-center">
            <div className="col-md-6 col-lg-7">
              <img
                src={rectangle2}
                className="img-fluid tuor-img"
                alt="Rectangle"
              />
            </div>
            <div className="col-md-6 col-lg-5 text-light font-inter my-md-0 my-4">
              <h3 className="h2 font-grand font-bold text-cyan">
                Lorem ipsum dolor sit amet. Est dolorum offi.
              </h3>
              <br />
              <p>
                Lorem ipsum dolor sit amet. Est dolorum officia qui numquam
                eveniet sit autem laboriosam ea sapiente earum hic sequi quam
                sit veniam deleniti ad modi obcaecati.{" "}
              </p>
              <p>
                Et consequuntur ipsa non perferendis incidunt non perferendis
                temporibus et quisquam iusto ut asperiores nesciunt et
                reiciendis inventore.
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
                src={rectangle3}
                alt="rectangle"
                className="img-fluid chat-img"
              />
              <h3 className="font-grand font-bold py-3">
                Lorem ipsum dolor sit amet similique.
              </h3>
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center px-5 px-md-3">
              <img
                src={rectangle3}
                alt="rectangle"
                className="img-fluid chat-img"
              />
              <h3 className="font-grand font-bold py-3">
                Lorem ipsum dolor sit amet similique.
              </h3>
            </div>
            <div className="chat-card col-md-4 d-flex flex-column justify-content-center px-5 px-md-3">
              <img
                src={rectangle3}
                alt="rectangle"
                className="img-fluid chat-img"
              />
              <h3 className="font-grand font-bold py-3">
                Lorem ipsum dolor sit amet similique.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
