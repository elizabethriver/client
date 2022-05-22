import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incomeAllAxiosDashboard,
  expensesAllAxiosDashboard,
} from "./dashboardSlice";
import "./style/dashboard.css";
import { getKeyFromLocalStorage, reduceBalance } from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { DashboardArray } from "../../components/dashboardArray/dashboardArray";

export const Dashboard = () => {
  const token = getKeyFromLocalStorage("token");
  const nameUserSet = getKeyFromLocalStorage("name");
  const dispatch = useDispatch();
  const { incomeAllDashboardData, expenseAllDashboardData, loading } =
    useSelector((state) => state.dataDashboard);
  const balance = reduceBalance(
    incomeAllDashboardData,
    expenseAllDashboardData
  );
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
    <main>
      <div className="container-header">
        <h1>
          Welcome <i>{nameUserSet}</i>
        </h1>
        <div className="container_account">
          <h2>
            Balance: ${""}
            {balance}
          </h2>
        </div>
      </div>
      <section className="container_dashboard">
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
  );
};
