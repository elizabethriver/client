import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./view/login/login";
import { Dashboard } from "./view/dashboard/dashboard";
import { Income } from "./view/income/income";
import { Expense } from "./view/expense/expense";
import { Register } from "./view/register/register";
import { Navigate } from "./components/navigate/navigate";
import { NotFound } from "./view/notfound/notfound";
import { IncomeDetails } from "./view/incomedetails/incomedetails";
import { ExpenseDetails } from "./view/expensedetails/expensedetails";
import { Protected } from "./utils/utils";

const AuthContext = createContext(null);
console.log(AuthContext.Provider);
function App() {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={token}>
      <Navigate />
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="income/:incomeId" element={<IncomeDetails />} />
          <Route path="expense" element={<Expense />} />
          <Route path="expense/:expenseId" element={<ExpenseDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
