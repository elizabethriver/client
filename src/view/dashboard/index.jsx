import React from 'react'
import { Link } from "react-router-dom";
import { dashboard } from '../../api/api';

export const Dashboard = () => {
  const token = localStorage.getItem('token')
  const prime = async () => {
    try {
      const response = await dashboard(token)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
prime()

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
