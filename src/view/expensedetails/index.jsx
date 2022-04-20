import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getExpenseByID } from "../../api/api";
import "./style/expensedetails.css";
import EdiText from "react-editext";
import { putExpenseByID } from "./../../api/api";

export const ExpenseDetails = () => {
  const token = localStorage.getItem("token");
  let params = useParams();

  const apiTest = async () => {
    try {
      const response = await getExpenseByID(token, params.expenseId);
      return response;
    } catch (error) {
      throw error
    }
  };
  apiTest();

  const mockData = {
    product: "uva",
    expense: 233,
  };
  const [inputProduct, setInputProduct] = useState(mockData.product);
  const [inputExpense, setInputExpense] = useState(mockData.expense);

  const handleSaveProduct = (product) => {
    setInputProduct(product);
  };
  const handleSaveExpense = (expense) => {
    setInputExpense(expense);
  };
  const dataToUpdate = {
    product: inputProduct,
    expense: parseInt(inputExpense),
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await putExpenseByID(
        token,
        dataToUpdate.product,
        dataToUpdate.expense,
        params.expenseId
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

  const onClickDelete = () => {
    console.log('Delete')
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div>
      expenseDetails {params.expenseId}
      <form className="formForEdit" onSubmit={submitUpdate}>
        <EdiText validation={validationName} validationMessage="Please type name income." showButtonsOnHover type="text"  value={inputProduct} onSave={handleSaveProduct} />
        <EdiText validation={validationNumber} validationMessage="Please type name income." showButtonsOnHover type="text"  value={inputExpense} onSave={handleSaveExpense} />
        <button type="submit">Update</button>
      </form>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};
