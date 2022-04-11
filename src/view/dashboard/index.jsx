import React from 'react'
import { Outlet, Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>dashboard
      <nav>
        <ul>
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li>
            <Link to="/expense">Expense</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
