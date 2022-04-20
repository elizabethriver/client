/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIncomeByID } from "../../api/api";
import "./style/incomedetails.css";
import EdiText from "react-editext";
import { putIncomeByID, deleteIncomeByID } from "./../../api/api";

export const IncomeDetails = () => {
  const token = localStorage.getItem("token");
  let params = useParams();
  let navigate = useNavigate();

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
  const onClickDelete = async() => {
    console.log('Delete')
    try {
      await deleteIncomeByID(token, params.incomeId)
      document.getElementById("mssgIncorrectTyping").innerHTML = "Deleting";
      setTimeout(() => {
        navigate("/income");
      }, 2000);

    } catch (error) {
      document.getElementById("mssgIncorrectTyping").innerHTML = "Error with deleting";
      throw error
    }
  }

  return (
    <div>
      IncomeDetails {params.incomeId}
      <form className="formForEdit" onSubmit={submitUpdate}>
        <EdiText validation={validationName} validationMessage="Please type name income." showButtonsOnHover type="text" value={inputProduct} onSave={handleSaveProduct} />
        <EdiText validation={validationNumber} validationMessage="Please type income" showButtonsOnHover type="text" value={inputIncome} onSave={handleSaveIncome} />
        <button type="submit">Update</button>
      </form>
      <small id="mssgIncorrectTyping" />
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};
