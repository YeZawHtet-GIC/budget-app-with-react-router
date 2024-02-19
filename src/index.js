import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
//pages imports
import ExpensePage, { expenseAction, expenseLoader } from "./pages/ExpensePage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
//action
import deleteBudget from "./actions/deleteBudget";
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
        action: DashboardAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children:[
          {
            path:"delete",
            action:deleteBudget,
          }
        ]
      },
      {
        path: "Expenses",
        element: <ExpensePage />,
        loader: expenseLoader,
        action: expenseAction,
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
