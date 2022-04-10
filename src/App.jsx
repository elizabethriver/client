import React from "react";
// import { Counter } from "./features/counter/Counter";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./view/login/index";
import { Dashboard } from "./view/dashboard/index";
import { Income } from "./view/income/index";
import { Expense } from "./view/expense/index";
import { Register } from "./view/register/index";
import { Layout } from "./components/layout";
import { NotFound } from "./view/notfound";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Counter />
      </header> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
