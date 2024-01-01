import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Presentation from "./pages/Presentation.jsx";
import Ecurie from "./pages/Ecurie.jsx";
import Concours from "./pages/Concours.jsx";
import Horaires from "./pages/Horaires.jsx";
import Partenaires from "./pages/Partenaires.jsx";
import Contact from "./pages/Contact.jsx";
import SiteMap from "./pages/SiteMap.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/presentation",
    element: <Presentation />,
  },
  {
    path: "/:ecurieId",
    element: <Ecurie />,
  },
  {
    path: "/concours",
    element: <Concours />,
  },
  {
    path: "/concours/:concoursId",
    element: <Horaires />,
  },
  {
    path: "/partenaires",
    element: <Partenaires />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/administration/login",
    element: <App />,
  },
  {
    path: "/administration/dashboard",
    element: <App />,
  },
  {
    path: "/administration/concours",
    element: <App />,
  },
  {
    path: "/administration/concours/:concoursId",
    element: <App />,
  },
  {
    path: "/administration/partenaires",
    element: <App />,
  },
  {
    path: "/administration/partenaires/:partenaireId",
    element: <App />,
  },
  {
    path: "/administration/ecuries",
    element: <App />,
  },
  {
    path: "/administration/ecuries/:ecurieId",
    element: <App />,
  },
  {
    path: "/mentions-legales",
    element: <MentionsLegales />,
  },
  {
    path: "/plan-du-site",
    element: <SiteMap />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
