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

//Delete Item
export const deleteItem = (key) => {
  return localStorage.removeItem(key);
};
