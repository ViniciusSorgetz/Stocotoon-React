import stocotoonAPI from "../axios/config";

import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

function CreateChapter() {
  const navigate = useNavigate();

  const { session, setSession } = useContext(UserContext);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const criarCapitulo = async (e) => {
    e.preventDefault();
    let storyId = window.location.href;
    storyId = storyId.split("/")[5];
    console.log(storyId);
    const chapter = {
      name,
      StoryId: storyId,
    };
    try {
      await stocotoonAPI.post("/chapter/create", chapter, {
        headers: {
          Authorization: `Bearer ${session.UserToken}`,
        },
      });
      navigate(`/story/${storyId}`);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="text-center font-grand font-bold text-cyan">
        Criar capítulo
      </h2>
      <form className="my-form" onSubmit={(e) => criarCapitulo(e)}>
        <div className="form-item">
          <label htmlFor="name" className="text-light">
            Nome do capítulo
          </label>
          <input
            type="text"
            className="bg-gray1 text-light"
            name="name"
            placeholder="Digite o nome do capítulo"
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
        {message.length !== 0 && <p className='text-danger text-center lead'>{message}</p>}
      </form>
    </div>
  );
}

export default CreateChapter;
