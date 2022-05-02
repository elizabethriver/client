import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./style/navigate.css";

export const Navigate = () => {
  return (
    <header>
      <nav>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </nav>
      <Outlet />
    </header>
  );
};
