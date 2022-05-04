import React from "react";
import { Items } from "../item/items";

export const DashboardArray = ({ listDashboardData, title, url }) => {
  return (
    <>
      <span className="income_title">{title}</span>
      <ul className="income_body">
        <Items array={listDashboardData} url={url} />
      </ul>
    </>
  );
};
