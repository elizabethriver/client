import React from 'react'
import { Link } from "react-router-dom";

export const LinkStandard = ({to, children}) => {
  return (
    <Link to={to}>{children}</Link>
  )
}
