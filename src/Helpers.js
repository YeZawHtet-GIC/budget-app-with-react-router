//Local Storage
export const FetchData = (key) => {
  const data = localStorage.getItem(key);
  if (!data) {
    // Handle case when data is empty or null
    return null;
  }
  return JSON.parse(data);
};
//button wait
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000000));
//generate random color
const generateRandomColor = () => {
  const existingBudgetLength = FetchData("budgets")?.Length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};
//Create Budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudget = FetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};
//Create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpense = FetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpense, newItem])
  );
};

//Delete Item
export const deleteItem = (key) => {
  return localStorage.removeItem(key);
};
//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = FetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    //check if the expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;
    //add the current amount to my total
    return acc += expense.amount;
  }, 0)
  return budgetSpent;
}
//Formatting

//Format Currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  })
}