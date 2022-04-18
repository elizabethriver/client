import React from 'react'
import { useParams } from "react-router-dom";

export const IncomeDetails = () => {
  let params = useParams();
  return (
    <div>incomeDetails {params.incomeId} </div>
  )
}
