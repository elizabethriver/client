import React from 'react'
import { Outlet, Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>dashboard
      <button>
      <Link to="/income">Income</Link>
      </button>
      <button>
      <Link to="/expense">Expense</Link>
      </button>
    </div>
  )
}
