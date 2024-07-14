import stocotoonAPI from "../axios/config";

import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const navigate = useNavigate();

  const { session, setSession } = useContext(UserContext);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const criarPagina = async (e) => {
    e.preventDefault();
    let chapterId = window.location.href;
    chapterId = chapterId.split("/")[5];
    console.log(chapterId);
    const page = {
      name,
      ChapterId: chapterId,
    };
    try {
      await stocotoonAPI.post("/page/create", page, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      navigate(`/chapter/${chapterId}`);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="text-center font-grand font-bold text-cyan">
        Criar página
      </h2>
      <form className="my-form" onSubmit={(e) => criarPagina(e)}>
        <div className="form-item">
          <label htmlFor="name" className="text-light">
            Nome da página
          </label>
          <input
            type="text"
            className="bg-gray1 text-light"
            name="name"
            placeholder="Digite o nome da página"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn-cyan font-inter font-bold text-gray1"
        >
          Criar
        </button>
        {message.length !== 0 && (
          <p className="text-danger text-center lead">{message}</p>
        )}
      </form>
    </div>
  );
}

export default CreatePage;
