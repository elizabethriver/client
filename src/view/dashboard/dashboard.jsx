import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incomeAllAxiosDashboard,
  expensesAllAxiosDashboard,
} from "./dashboardSlice";
import "./style/dashboard.css";
import {
  getKeyFromLocalStorage,
  reduceBalance,
  objectValuesListI,
  objectValuesListE,
} from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { DashboardArray } from "../../components/dashboardArray/dashboardArray";
import { Graphs } from "./../../components/graphs/graphs";

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
  console.log(typeof balance)
  const initFetch = useCallback(() => {
    dispatch(incomeAllAxiosDashboard(token));
    dispatch(expensesAllAxiosDashboard(token));
  }, [dispatch, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const objectValuesIncome = objectValuesListI(incomeAllDashboardData);
  const objectValuesExpense = objectValuesListE(expenseAllDashboardData);

  if (!token) {
    return <AuthNoLogged />;
  }
  if (loading) return <Loading />;
  return (
    <main className="container_main_dashboard">
      <div className="container-header">
        <h1>
          Welcome <i>{nameUserSet}</i>!
        </h1>
        <div
          className={`container_account ${parseInt(balance) < 0 ? "negative" : "positive"}`}
        >
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
      <div className="container_graphs">
        <Graphs objectValues={objectValuesIncome} title="Incomes" />
        <Graphs objectValues={objectValuesExpense} title="Expenses" />
      </div>
    </main>
  );
};
