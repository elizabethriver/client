import React, { useCallback, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incomeAllAxiosDashboard,
  expensesAllAxiosDashboard,
} from "./dashboardSlice";
import { Items } from "../../components/item/items";
import "./style/dashboard.css";
import { getKeyFromLocalStorage } from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { Button } from "./../../components/buttons/button";

export const Dashboard = () => {
  const token = getKeyFromLocalStorage("token");
  const nameUserSet = getKeyFromLocalStorage("name");
  const dispatch = useDispatch();
  const { incomeAllDashboardData, expenseAllDashboardData, loading } =
    useSelector((state) => state.dataDashboard);

  const initFetch = useCallback(() => {
    dispatch(incomeAllAxiosDashboard(token));
    dispatch(expensesAllAxiosDashboard(token));
  }, [dispatch, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (!token) {
    return <AuthNoLogged />;
  }
  if (loading) return <Loading />;
  return (
    <div>
      dashboard {nameUserSet}
      <main>
        <div>
          <Button>
            <Link to="/income">Income</Link>
          </Button>
          <Button>
            <Link to="/expense">Expense</Link>
          </Button>
        </div>
        <section className="container">
          <span className="income_title">Incomes</span>
          <ul className="income_body">
            <Items array={incomeAllDashboardData} url="/income" />
          </ul>
          <span className="expense_title">Expenses</span>
          <ul className="expense_body">
            <Items array={expenseAllDashboardData} url="/expense" />
          </ul>
        </section>
      </main>
    </div>
  );
};
