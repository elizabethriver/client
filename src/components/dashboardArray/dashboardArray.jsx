import React from "react";
import { Items } from "../item/items";

export const DashboardArray = ({ listDashboardData, title, url }) => {
  let classItems_title = title === "Incomes" ? "income_title" : "expense_title";
  let classItem = title === "Incomes" ? "productIn" : "productEx";

  return (
    <>
      <h3 className={classItems_title}>{title}</h3>
      <ul className={classItem}>
        <Items array={listDashboardData} url={url} />
      </ul>
    </>
  );
};
