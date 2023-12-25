import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Routes from "./Routes.jsx";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Navbar from "./Component/Navbar.jsx";
const router = createBrowserRouter(Routes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
