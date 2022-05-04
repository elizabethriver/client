import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./style/navigate.css";
import { LinkStandard } from "./../link/Link";

export const Navigate = () => {
  return (
    <header>
      <nav>
        <li>
          <LinkStandard to="/" children="Login" />
        </li>
        <li>
          <LinkStandard to="/register" children="Register" />
        </li>
      </nav>
      <Outlet />
    </header>
  );
};
