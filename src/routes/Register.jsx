import stocotoonAPI from '../axios/config';

import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = localStorage.getItem("session");
    if(checkSession){
      navigate("/");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const createUser = async (e) => {

    e.preventDefault();

    const user = {name,
      email,
      password,
      confirmPassword
    }
    const userData = JSON.stringify(user);

    try {
      await stocotoonAPI.post("/user/register", userData);
      navigate("/entrar");
    }
    catch (error) {
      setMessage(error.response.data.message);
    }

  }

  return (
    <div className="mb-5">
      <h2 className="text-center font-grand font-bold text-cyan">Criar uma conta</h2>
      <form className="my-form" onSubmit={(e) => createUser(e)}>
        <div className="form-item">
          <label for="name"className="text-light">Nome</label>
          <input type="text" className="bg-gray1 text-light" name="name" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-item">
          <label for="email"className="text-light">E-mail</label>
          <input type="email" className="bg-gray1 text-light" name="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-item">
          <label for="password"className="text-light">Senha</label>
          <input type="text" className="bg-gray1 text-light" name="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-item">
          <label for="confirmPassword"className="text-light">Confirmação de Senha</label>
          <input type="text" className="bg-gray1 text-light" name="confirmPassword" placeholder="Digite sua senha" onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn-cyan font-inter font-bold text-gray1">Criar Conta</button>
      </form>
      {message.length !== 0 && <p className="text-light text-center lead">{message}</p>}
    </div>
  )
}

export default Register