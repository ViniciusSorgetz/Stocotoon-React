import { Outlet } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged}/>
        <div className="content mt-nav">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default App;
