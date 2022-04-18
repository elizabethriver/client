import React from 'react'
import { useParams } from "react-router-dom";
import { getExpenseByID } from '../../api/api';

export const ExpenseDetails = () => {
  const token = localStorage.getItem('token')
  let params = useParams();
  const onClickApi = async(e) => {
    e.preventDefault()
    try {
      const response = await getExpenseByID(token, params.expenseId)
      console.log(response)
    } catch (error) {
      console.error(error, 'error')
    }
  }

  return (
    <div>expenseDetails {params.expenseId} 
    <button onClick={onClickApi}>Click</button>
    </div>
  )
}
