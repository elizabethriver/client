import React from "react";
import { Items } from "../item/items";

export const DashboardArray = ({ listDashboardData, title, url }) => {
  return (
    <>
      <h2 className="income_title">{title}</h2>
      <ul className="income_body">
        <Items array={listDashboardData} url={url} />
      </ul>
    </>
  );
};
