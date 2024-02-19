import React from "react";
//helper import
import { createExpense, deleteItem, getAllMatchingItems } from "../Helpers";
//rrd import
import { useLoaderData } from "react-router-dom";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

//Loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expense = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if (!budget) {
    throw new Error("The budget you're trying to find does not exists!");
  }
  return { budget, expense };
}

export default function BudgetPage() {
  const { budget, expense } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true}/>
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expense && expense.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expense} showBudget={false} />
        </div>
      )}
    </div>
  );
}

//action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
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
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense Deleted!");
    } catch (e) {
      throw new Error(
        "There was a problem deleting your Expense. Please try again!"
      );
    }
  }
}

//
