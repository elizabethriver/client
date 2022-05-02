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
import { getToken } from "../../utils/utils";

export const IncomeDetails = () => {
  const token = getToken("token");
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataIncomeById, loading } = useSelector(
    (state) => state.getIncomeByID
  );
  useEffect(() => {
    dispatch(getIncomeByIdTrunk({ token: token, incomeId: params.incomeId }));
  }, [dispatch, params.incomeId, token]);

  const [inputsEditMode, setInputsEditMode] = useState({
    product: "",
    income: "",
  });
  const [editState, setEditState] = useState(false);
  const editMode = () => {
    setEditState(!editState);
  };
  const removeEditMode = () => {
    setEditState(false);
  };
  const onChangeHandlerInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsEditMode({
      ...inputsEditMode,
      [name]: value,
    });
  };

  const dataToUpdate = {
    product: inputsEditMode.product,
    income: parseInt(inputsEditMode.income),
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

  if (loading) {
    return <p>Loading</p>;
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
              onChange={onChangeHandlerInputs}
              value={inputsEditMode.product}
              required
              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
              title="Just type letters is allowed"
            />
            <input
              type="text"
              name="income"
              placeholder={dataIncomeById.income}
              onChange={onChangeHandlerInputs}
              value={inputsEditMode.income}
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
