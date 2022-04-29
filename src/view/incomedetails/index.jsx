/* eslint-disable no-useless-escape */
import React, { useState, useCallback, useEffect,  useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIncomeByID } from "../../api/api";
import "./style/incomedetails.css";
import EdiText from "react-editext";
import { putIncomeByID, deleteIncomeByID } from "./../../api/api";
import { getIncomeByIdTrunk } from './incomeDetailsSlice';

export const IncomeDetails = () => {
  const token = localStorage.getItem("token");
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataIncomeById, loading } = useSelector(
    (state) => state.getIncomeByID
  );
  console.log(dataIncomeById, loading)
  const initFetch = useCallback(() => {
    dispatch(getIncomeByIdTrunk({token: token,  incomeId: params.incomeId}));
  }, [dispatch, params.incomeId, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const [inputProduct, setInputProduct] = useState(dataIncomeById.product);
  const [inputIncome, setInputIncome] = useState(dataIncomeById.income);

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
  if (loading) {
    return <p>Loading</p>
  }
  return (
    <div>
      IncomeDetails {params.incomeId}
      <form className="formForEdit" onSubmit={submitUpdate}>
        <span>{dataIncomeById.product}</span>
        <strong>{dataIncomeById.income}</strong>
        <EdiText validation={validationName} validationMessage="Please type name income." showButtonsOnHover type="text" value={inputProduct} onSave={handleSaveProduct} />
        <EdiText validation={validationNumber} validationMessage="Please type income" showButtonsOnHover type="text" value={inputIncome} onSave={handleSaveIncome} />
        <button type="submit">Update</button>
      </form>
      <small id="mssgIncorrectTyping" />
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};
