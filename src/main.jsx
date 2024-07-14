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
import CreateStory from './routes/CreateStory';
import Story from './routes/Story';

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
      },
      {
        path: "/team/criar/:TeamId",
        element: <CreateStory/>
      },
      {
        path: "/story/:StoryId",
        element: <Story/>
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
