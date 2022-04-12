import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './style/home.css'

export const Home = () => {
  return (
    <div>
        <nav>
        <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </nav>
        <Outlet />
    </div>
  )
}
