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
      console.log(response)
      return response;
    } catch (error) {
      console.error(error, "error");
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
    console.log(product);
  };
  const handleSaveExpense = (expense) => {
    setInputExpense(expense);
    console.log(expense);
  };
  const dataToUpdate = {
    product: inputProduct,
    expense: parseInt(inputExpense),
  };
  console.log(dataToUpdate);
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await putExpenseByID(
        token,
        dataToUpdate.product,
        dataToUpdate.expense,
        params.expenseId
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      expenseDetails {params.expenseId}
      <form className="formForEdit" onSubmit={submitUpdate}>
        <EdiText type="text" value={inputProduct} onSave={handleSaveProduct} />
        <EdiText type="text" value={inputExpense} onSave={handleSaveExpense} />
        <button type="submit">Saved</button>
      </form>
    </div>
  );
};
