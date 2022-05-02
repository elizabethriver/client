/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/incomedetails.css";
import {
  getIncomeByIdTrunk,
  updateIncomeByIdTrunk,
  deleteIncomeByIdTrunk,
} from "./incomeDetailsSlice";
import { getKeyFromLocalStorage } from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";

export const IncomeDetails = () => {
  const token = getKeyFromLocalStorage("token");
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataIncomeById, loading } = useSelector(
    (state) => state.getIncomeByID
  );
  useEffect(() => {
    dispatch(getIncomeByIdTrunk({ token: token, incomeId: params.incomeId }));
  }, [dispatch, params.incomeId, token]);
  const product = { product: "", income: "" };
  const { inputsForm, setInputsForm, onChangeInputsForm } =
    HooksFormOfProducts(product);
  const [editState, setEditState] = useState(false);
  const editMode = () => {
    setEditState(!editState);
  };
  const removeEditMode = () => {
    setEditState(false);
  };
  const dataToUpdate = {
    product: inputsForm.product,
    income: parseInt(inputsForm.income),
  };
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateIncomeByIdTrunk({
          token: token,
          product: dataToUpdate.product,
          income: dataToUpdate.income,
          incomeId: params.incomeId,
        })
      ).unwrap();
      setInputsForm(product);
      removeEditMode();
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const onClickDelete = async () => {
    console.log("Delete");
    try {
      console.log();
      dispatch(
        deleteIncomeByIdTrunk({
          token: token,
          incomeId: params.incomeId,
        })
      ).unwrap();
      document.getElementById("mssgIncorrectTyping").innerHTML = "Deleting";
      removeEditMode();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      document.getElementById("mssgIncorrectTyping").innerHTML =
        "Error with deleting";
      throw error;
    }
  };
  if (!token) {
    return <AuthNoLogged />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      IncomeDetails {params.incomeId}
      <div>
        {editState ? (
          <form onSubmit={submitUpdate}>
            <input
              type="text"
              name="product"
              placeholder={dataIncomeById.product}
              onChange={onChangeInputsForm}
              value={inputsForm.product}
              required
              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
              title="Just type letters is allowed"
            />
            <input
              type="text"
              name="income"
              placeholder={dataIncomeById.income}
              onChange={onChangeInputsForm}
              value={inputsForm.income}
              required
              pattern="^[0-9]+$"
              title="Just type number is allowed"
            />
            <button type="submit">Save</button>
            <button onClick={removeEditMode}>Cancel</button>
          </form>
        ) : (
          <div>
            <span>{dataIncomeById.product}</span>
            <strong>${dataIncomeById.income}</strong>
            <button onClick={editMode}>Update</button>
          </div>
        )}
      </div>
      <button onClick={onClickDelete}>Delete</button>
      <small id="mssgIncorrectTyping"></small>
    </div>
  );
};
