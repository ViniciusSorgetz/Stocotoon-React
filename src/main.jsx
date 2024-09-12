import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import UserProfile from './routes/UserProfile';
import Dashboard from "./routes/Dashboard";
import Team from "./routes/Team";
import TeamInfo from "./routes/TeamInfo";
import Story from "./routes/Story";
import Chapter from "./routes/Chapter";
import DrawingApp from "./routes/DrawingApp";
import Chat from "./routes/Chat";

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/cadastro",
        element: <Register/>,
      },
      {
        path: "/entrar",
        element: <Login/>,
      },
      {
        path: "/seu-perfil",
        element: <UserProfile/>
      },
      {
        path: "/dashboard/:UserId",
        element: <Dashboard/>,
      },
      {
        path: "/team/:TeamId",
        element: <Team/>,
      },
      {
        path: "/team/:TeamId/info",
        element: <TeamInfo/>,
      },
      {
        path: "/story/:StoryId",
        element: <Story/>,
      },
      {
        path: "/chapter/:ChapterId",
        element: <Chapter/>,
      },
      {
        path: "/drawingApp/:PictureId",
        element: <DrawingApp/>,
      },
      {
        path: "/chat/",
        element: <Chat/>,
        children: [
          {
            path: ":TeamName",
            element: <Chat/>,
            children: [
              {
                path: ":ChatIndex",
                element: <Chat/>
              }
            ]
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
