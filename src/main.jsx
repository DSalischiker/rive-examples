import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import riveLogo from '/rive.svg';
import hakunaLogo from '/u_white.png';

import RiveLoader from "./components/RiveLoader.jsx";
import RiveHero from "./components/RiveHero.jsx";
import RiveForm from "./components/RiveForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="home-container">
        <div className="logos-container">
          <a href="https://rive.app" target="_blank">
            <img src={riveLogo} className="logo" alt="Rive logo" />
          </a>
          {/* <p className="times">|</p> */}
          <a href="https://www.studiohakuna.com/" target="_blank">
            <img src={hakunaLogo} className="logo hakuna" alt="Hakuna logo" />
          </a>
        </div>
        <h1>Rive x Hakuna</h1>
        {/* <h2>Hakuna's Rive Examples!</h2> */}
        <div className="buttons-container">
          <a href="/form"><button>Form</button></a>
          <a href="/hero"><button>Hero</button></a>
          <a href="/loader"><button>Loader</button></a>
          <a href="/chart"><button>Chart</button></a>
        </div>

        <p className="read-the-docs">
          Click on the Hakuna and Rive logos to learn more
        </p>
      </div>
      ),
  },
  {
    path: "/form",
    element: <RiveForm />,
  },
  {
    path: "/hero",
    element: <RiveHero />,
  },
  {
    path: "/loader",
    element: <RiveLoader />,
  },
  {
    path: "/chart",
    element: <div>Hello to my Rive chart</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
