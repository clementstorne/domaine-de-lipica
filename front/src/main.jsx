import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/presentation",
    element: <App />,
  },
  {
    path: "/:ecurieId",
    element: <App />,
  },
  {
    path: "/concours",
    element: <App />,
  },
  {
    path: "/concours/:concoursId",
    element: <App />,
  },
  {
    path: "/partenaires",
    element: <App />,
  },
  {
    path: "/contact",
    element: <App />,
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
    element: <App />,
  },
  {
    path: "/plan-du-site",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
