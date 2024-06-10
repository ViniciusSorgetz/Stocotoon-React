import { useState, createContext } from 'react';

export const UserContext = createContext({});

function UserProvider({children}){

    const [session, setSession] = useState(JSON.parse(localStorage.getItem("session")));

    return(
        <UserContext.Provider value={{ session, setSession }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;