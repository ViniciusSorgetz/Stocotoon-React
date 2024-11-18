import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/User";
import stocotoonAPI from "../../axios/config"

import './UserProfile.css';

const UserProfile  = () => {

  const {session, setSession} = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
      const resp = await stocotoonAPI.get(`/user/${session.UserId}`, {headers: {
        Authorization: `Bearer ${session.UserToken}`
      }});
      setUserData(resp.data);
  }

  const editUser = async (e) => {
    e.preventDefault();
      try {
        const resp = await stocotoonAPI.put(`/user/${session.UserId}`, {
          name: userName,
        }, {headers: {
          Authorization: `Bearer ${session.UserToken}`
        }});
        const updatedSession = {...session};
        updatedSession.Username = userName;
        setSession(updatedSession);
        localStorage.setItem("session", JSON.stringify(updatedSession));
        setEditMode(false);
      } 
      catch (error) {
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
  }

  const handleCancel = async () => {
    setEditMode(false);
    setErrorMessage("");
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `Conta criada em: ${day}/${month}/${year}`;
  }

  return (
    <div className="mt-nav container d-flex justify-content-center">
      <div className="card profile-card">
        <div className="card-header profile-card-header p-3 px-4 d-flex justify-content-between flex-">
          <span className="text-gray2 align-left w-100">Sua conta</span>
          <i 
            className="bi bi-pencil text-gray2 m-0"
            onClick={() => {
              setEditMode(true);
              setUserName(session.Username);
            }}
            style={{cursor: "pointer"}}
          />
        </div>
        <div className="card-body d-flex flex-column align-items-center py-4 px-4">
          {editMode ? 
          <form className="my-form d-flex flex-column align-items-center" onSubmit={editUser}>
            <div className="pb-3 d-flex">
              <input 
                type="file" 
                id="profile-picture-input" 
                style={{display: "none"}}
                accept="image/png, image/jpg"
                onChange={(e) => console.log(e.target.files[0])}
              />
            </div>
            <div className="form-item p-0 w-100">
              <input 
                type="text" 
                value={userName}
                className="bg-gray1 text-light"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <span className="text-gray2 align-left w-100">
              {userData.email}
            </span>
            <div className="d-flex w-100 gap-2 mt-4">
              <button className="btn-outline-cyan" type="submit">Salvar</button>
              <button className="btn-gray" type="button" onClick={handleCancel}>Cancelar</button>
            </div>
            {errorMessage.length !== 0 && <p className='text-danger text-left w-100 mt-3 error-message'>{errorMessage}</p>}
          </form> : 
          <>
            <h1 className="text-cyan font-bold font-grand align-left w-100 h3 mt-4 mb-0">{session.Username}</h1>
            <span className="text-gray2 align-left w-100">
              {userData.email}
            </span>
          </>
          }
        </div>
        <div className="card-footer profile-card-footer p-3 px-4">
          <span className="text-gray2 ont-grand align-left w-100 mt-4">
            {formatDate(userData.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile