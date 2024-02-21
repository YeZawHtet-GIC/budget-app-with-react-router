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
  const existingBudgetLength = FetchData("budgets")?.length ?? 0;
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
  const existingBudgets = FetchData("budgets") ?? [];
  
  // Find the budget corresponding to the provided budgetId
  const budget = existingBudgets.find(budget => budget.id === budgetId);
  
  // If budget not found or expense amount exceeds budget amount, return early
  if (!budget || (budget.amount - calculateSpentByBudget(budgetId)) < amount) {
    return false; // Validation failed
  }
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpense = FetchData("expenses") ?? [];
   localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpense, newItem])
  );
  return true;
};

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = FetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    //check if the expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;
    //add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};
//get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = FetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//Delete Item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = FetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

//Formatting
//Format Date
export const formatDate = (givenDate) =>
  new Date(givenDate).toLocaleDateString();
//format percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
//Format Currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
