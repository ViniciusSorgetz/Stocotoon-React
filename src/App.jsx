import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import UserProvider from './contexts/User';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

function App() {
  
  return (
    <UserProvider>
      <div className="App">
            <Navbar/>
            <div className="content">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    </UserProvider>
  )
}

export default App;
