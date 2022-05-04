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
import { DashboardArray } from "../../components/dashboardArray/dashboardArray";

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
        <section>
          <DashboardArray
            listDashboardData={incomeAllDashboardData}
            title="Incomes"
            url="/income"
          />
          <DashboardArray
            listDashboardData={expenseAllDashboardData}
            title="Expenses"
            url="/expense"
          />
        </section>
      </main>
    </div>
  );
};
