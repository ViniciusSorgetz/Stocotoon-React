import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import CriarEquipe from './routes/CriarEquipe';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cadastro",
        element: <Register/>
      },
      {
        path: "/entrar",
        element: <Login/>
      },
      {
        path: "/:UserId/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/:UserId/dashboard/criar",
        element: <CriarEquipe/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </React.StrictMode>,
)
