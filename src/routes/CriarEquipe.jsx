import React, { useState } from 'react'

function CriarEquipe() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

  return (
    <div className="mb-5">
        <h2 className="text-center font-grand font-bold text-cyan">Criar Equipe</h2>
        <form className="my-form" onSubmit={(e) => loginUser(e)}>
        <div className="form-item">
          <label for="name"className="text-light">E-mail</label>
          <input type="text" className="bg-gray1 text-light" name="name" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-item">
          <label for="description"className="text-light">Senha</label>
          <input type="text" className="bg-gray1 text-light" name="description" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn-cyan font-inter font-bold text-gray1">Entrar</button>
      </form>
    </div>
  )
}

export default CriarEquipe