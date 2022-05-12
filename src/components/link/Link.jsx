import React from 'react'
import { Link } from "react-router-dom";
import './style/link.css'

export const LinkStandard = ({to, children}) => {
  return (
    <Link className='classNav' to={to}>{children}</Link>
  )
}
