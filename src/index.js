import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//react-router-dom imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Layouts
import Main from "./layouts/Main";
import Dashboard, { DashboardAction, DashboardLoader } from "./pages/Dashboard";
//Error import
import Error from "./pages/Error";
//Loader import
import { MainLoader } from "./layouts/Main";
//logout import
import { logoutAction } from "./actions/logout";
//react toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: MainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: DashboardLoader,
        action:DashboardAction,
        errorElement: <Error />,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
