import React from "react";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../Helpers";
import { redirect } from "react-router-dom";

export default function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("Budget Deleted Successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget");
  }
  return redirect("/");
}
