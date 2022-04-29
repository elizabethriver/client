import React, { useState, useCallback, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/expensedetails.css";
import EdiText from "react-editext";
import { putExpenseByID, deleteExpenseByID } from "./../../api/api";
import { getExpenseByIdTrunk } from './expenseDetailsSlice';

export const ExpenseDetails = () => {
  const token = localStorage.getItem("token");
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataExpenseById, loading } = useSelector(
    (state) => state.getExpenseByID
  );
  const initFetch = useCallback(() => {
    dispatch(getExpenseByIdTrunk({ token: token, expenseId: params.expenseId }));
  }, [dispatch, params.expenseId, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

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
      return response;
    } catch (error) {
      throw error;
    }
  };
  const validationName = (val) => {
    let regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    regex.test(val);
  };
  const validationNumber = (val) => {
    let regex = /^[0-9]+$/;
    regex.test(val);
  };

  const onClickDelete = async () => {
    console.log("Delete");
    try {
      await deleteExpenseByID(token, params.expenseId);
      document.getElementById("mssgIncorrectTyping").innerHTML = "Deleting";
      setTimeout(() => {
        navigate("/expense");
      }, 2000);
    } catch (error) {
      document.getElementById("mssgIncorrectTyping").innerHTML =
        "Error with deleting";
      throw error;
    }
  };
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div>
      expenseDetails {params.expenseId}
      <form className="formForEdit" onSubmit={submitUpdate}>
        <span>{dataExpenseById.product}</span>
        <strong>{dataExpenseById.expense}</strong>
        <EdiText
          validation={validationName}
          validationMessage="Please type name income."
          showButtonsOnHover
          type="text"
          value={inputProduct}
          onSave={handleSaveProduct}
        />
        <EdiText
          validation={validationNumber}
          validationMessage="Please type name income."
          showButtonsOnHover
          type="text"
          value={inputExpense}
          onSave={handleSaveExpense}
        />
        <button type="submit">Update</button>
      </form>
      <small id="mssgIncorrectTyping" />
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};
