import stocotoonAPI from '../axios/config';
import { UserContext } from '../contexts/User';

import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const { session, setSession } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = localStorage.getItem("session");
    if(checkSession){
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    const user = {email, password,}
    const userData = JSON.stringify(user);

    try {
      const response = await stocotoonAPI.post("/user/login", userData);

      const data = {
        Username: response.data.name,
        UserId: response.data.id,
        UserToken: response.data.token,
      };
      console.log(data);
      localStorage.setItem("session", JSON.stringify(data));
      setSession(data);
      navigate("/");
    } 
    catch (error) {
      setMessage(error.response.data.message);
    }

  }

  return (
    <div className="mb-5 mt-nav">
      <h2 className="text-center font-grand font-bold text-cyan">Entrar</h2>
      <form className="my-form" onSubmit={(e) => loginUser(e)}>
        <div className="form-item">
          <label for="email"className="text-light">E-mail</label>
          <input type="email" className="bg-gray1 text-light" name="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-item">
          <label for="password"className="text-light">Senha</label>
          <input type="password" className="bg-gray1 text-light" name="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn-cyan font-inter font-bold text-gray1">Entrar</button>
      </form>
      {message.length !== 0 && <p className="text-danger text-center lead error-message">{message}</p>}
    </div>
  )
}

export default Login;