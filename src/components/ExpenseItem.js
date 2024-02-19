import React from "react";
import { formatCurrency, formatDate, getAllMatchingItems } from "../Helpers";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseItem({ expense, showBudget}) {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
      <td>
        {showBudget && (
          <td>
            <Link
              style={{ "--accent": budget.color }}
              to={`/budget/${budget.id}`}
            >
              {budget.name}
            </Link>
          </td>
        )}
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn-warning btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}
