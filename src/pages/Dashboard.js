import React from "react";
import Intro from "../components/Intro";
import AddExpenseForm from "../components/AddExpenseForm";
//react-router-dom imports
import { useLoaderData } from "react-router-dom";
//toastify
import { toast } from "react-toastify";
//AddBudgetForm
import AddBudgetForm from "../components/AddBudgetForm";
//Helper Functions
import { FetchData, createBudget, createExpense } from "../Helpers";
import BudgetItem from "../components/BudgetItem";
//Loader
export function DashboardLoader() {
  const userName = FetchData("userName");
  const budgets = FetchData("budgets");
  return { userName, budgets };
}

//Action
export async function DashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  //new user submmition
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error(
        "There was a problem creating the user. Please try again"
      );
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success(`Budget Created successfully`);
    } catch (e) {
      throw new Error(
        "There was a problem creating your New Budget. Please try again"
      );
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error(
        "There was a problem Adding new Expense. Please try again!"
      );
    }
  }
}

function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome Back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {
                    budgets.map((budget) => (
                      <BudgetItem key={budget.id} budget={budget} />
                    ))
                  }
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Personal budgeting is the secret to financial freedom.
                  <br />
                  Create your budget to get started!
                </p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
}

export default Dashboard;
