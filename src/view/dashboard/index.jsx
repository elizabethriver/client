import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incomeAllAxiosDashboard,
  expensesAllAxiosDashboard,
} from "./dashboardSlice";
import { Items } from "../../components/item/items";
import "./style/dashboard.css"

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { incomeAllDashboardData, expenseAllDashboardData, loading } = useSelector(
    (state) => state.dataDashboard
  );

  const initFetch = useCallback(() => {
    dispatch(incomeAllAxiosDashboard(token));
    dispatch(expensesAllAxiosDashboard(token));
  }, [dispatch, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      dashboard
      <main>
        <div>
          <button>
            <Link to="/income">Income</Link>
          </button>
          <button>
            <Link to="/expense">Expense</Link>
          </button>
        </div>
        <section className="container">
          
            <span className="income_title">Incomes</span>
            <ul className="income_body">
              <Items array={incomeAllDashboardData} url='/income'/>
            </ul>
            <span className="expense_title">Expenses</span>
            <ul className="expense_body">
              <Items array={expenseAllDashboardData} url='/expense'/>
            </ul>
          
        </section>
      </main>
    </div>
  );
};
