import React from "react";
import ExpenseItem from "./ExpenseItem";
export default function Table({ expenses, showBudget = true }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget}/>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
