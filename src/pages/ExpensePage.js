import React from "react";
import { useLoaderData } from "react-router-dom";
import { FetchData, deleteItem } from "../Helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";
export function expenseLoader() {
  const expenses = FetchData("expenses");
  return { expenses };
}

//action
export async function expenseAction({request}) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem ({
        key: "expenses",
        id: values.expenseId,
      });
      return toast .success("Expense Deleted!");
    } catch (e) {
      throw new Error(
        "There was a problem deleting your Expense. Please try again!"
      );
    }
  }
}

function ExpensePage() {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length})</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to Show</p>
      )}
    </div>
  );
}

export default ExpensePage;
