import React from "react";
import { NavLink } from "react-router-dom";
import "./style/link.css";

export const LinkStandard = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
      (isActive ? "classNav_active" : "classNav_notActive")}
    >
      {children}
    </NavLink>
  );
};
