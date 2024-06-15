import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import CreateTeam from './routes/CreateTeam';
import Team from './routes/Team';

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
        path: "/dashboard/:UserId",
        element: <Dashboard/>
      },
      {
        path: "/dashboard/criar/:UserId",
        element: <CreateTeam/>
      },
      {
        path: "/team/:TeamId",
        element: <Team/>
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
