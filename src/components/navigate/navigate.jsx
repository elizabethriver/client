import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigate.css";

export const Navigate = () => {
  return (
    <div>
      <nav>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </nav>
      <Outlet />
    </div>
  );
};
