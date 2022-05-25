import React from "react";
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
import Helmet from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>My wallet app: financial personal tool</title>
        <meta
          name="description"
          content="This is a app for register your incomes and expenses, usefully for your personal finances, where you'll see percentage of income and expense"
        />
        <meta name="theme-color" content="#047cf8" />
        <meta
          property="og:title"
          content="My wallet app: financial personal tool"
        />
        <meta
          property="og:description"
          content="This is a app for register your incomes and expenses, usefully for your personal finances, where you'll see percentage of income and expense"
        />
        {/* <meta
          id="og-image"
          property="og:image"
          content="https://i.ibb.co/k2rrW97/myWallet.jpg"
        /> */}
        <link rel="canonical" href="https://client-five-plum.vercel.app/" />
      </Helmet>
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
      </Routes>{" "}
    </>
  );
}

export default App;
