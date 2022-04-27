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
  const { incomeAllDashboardData, loadingIncome } = useSelector(
    (state) => state.incomeDashboard
  );
  const { expenseAllDashboardData, loadingExpense } = useSelector(
    (state) => state.expensesDashboard
  );

  const initFetch = useCallback(() => {
    dispatch(incomeAllAxiosDashboard(token));
    dispatch(expensesAllAxiosDashboard(token));
  }, [dispatch, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (loadingIncome && loadingExpense) return <p>Loading...</p>;
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
              <Items array={incomeAllDashboardData} />
            </ul>
            <span className="expense_title">Expenses</span>
            <ul className="expense_body">
              <Items array={expenseAllDashboardData} />
            </ul>
          
        </section>
      </main>
    </div>
  );
};
