/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getIncomeByID } from "../../api/api";
import "./style/incomedetails.css";
import EdiText from "react-editext";
import { putIncomeByID } from "./../../api/api";

export const IncomeDetails = () => {
  const token = localStorage.getItem("token");
  let params = useParams();

  const apiTest = async () => {
    try {
      const response = await getIncomeByID(token, params.incomeId);
      return response;
    } catch (error) {
      throw error
    }
  };
  apiTest();

  const mockData = {
    product: "bread",
    income: 233,
  };
  const [inputProduct, setInputProduct] = useState(mockData.product);
  const [inputIncome, setInputIncome] = useState(mockData.income);

  const handleSaveProduct = (product) => {
    setInputProduct(product);
  };
  const handleSaveIncome = (income) => {
    setInputIncome(income);
  };
  const dataToUpdate = {
    product: inputProduct,
    income: parseInt(inputIncome),
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await putIncomeByID(
        token,
        dataToUpdate.product,
        dataToUpdate.income,
        params.incomeId
      );
      return response
    } catch (error) {
      throw error
    }
  };

  const validationName = (val) => {
    let regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    regex.test(val) 
  }
  const validationNumber = (val) => {
    let regex = /^[0-9]+$/
    regex.test(val) 
  }

  return (
    <div>
      IncomeDetails {params.incomeId}
      <form className="formForEdit" onSubmit={submitUpdate}>
        <EdiText validation={validationName} validationMessage="Please type name income." showButtonsOnHover type="text" pattern value={inputProduct} onSave={handleSaveProduct} />
        <EdiText validation={validationNumber} validationMessage="Please type income" showButtonsOnHover type="text" value={inputIncome} onSave={handleSaveIncome} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
