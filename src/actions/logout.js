//helper import
import { deleteItem } from "../Helpers";
//react toastlify
import { toast } from "react-toastify";
//rrd imports
import { redirect } from "react-router-dom";
export async function logoutAction() {
  //delete User
  deleteItem({key:"userName"});
  //delete Budgets
  deleteItem({key:"budgets"});
  //delete Expenses
  deleteItem({key:"expenses"});
  //toast alert
  toast.success("You've Deleted Your Account!");
  //redirect to Home
  return redirect("/");
}
