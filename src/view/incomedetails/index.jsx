import React from 'react'
import { useParams } from "react-router-dom";
import { getIncomeByID } from '../../api/api';


export const IncomeDetails = () => {
  const token = localStorage.getItem('token')
  let params = useParams();
  const onClickApi = async(e) => {
    e.preventDefault()
    try {
      const response = await getIncomeByID(token, params.incomeId)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>incomeDetails {params.incomeId} 
    <button onClick={onClickApi}>Click</button>
    </div>
  )
}
