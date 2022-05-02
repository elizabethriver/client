import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/expensedetails.css";
import {
  getExpenseByIdTrunk,
  updateExpenseByIdTrunk,
  deleteExpenseByIdTrunk,
} from "./expenseDetailsSlice";
import { getKeyFromLocalStorage } from "../../utils/utils";
import { Loading } from "../../components/loading/loading";

export const ExpenseDetails = () => {
  const token = getKeyFromLocalStorage("token");
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataExpenseById, loading, docUpdateById, deleteDocUpdateById } =
    useSelector((state) => state.getExpenseByID);
  console.log(dataExpenseById, loading, docUpdateById, deleteDocUpdateById);
  const initFetch = useCallback(() => {
    dispatch(
      getExpenseByIdTrunk({ token: token, expenseId: params.expenseId })
    );
  }, [dispatch, params.expenseId, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const [inputsEditMode, setInputsEditMode] = useState({
    product: "",
    expense: "",
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
    expense: parseInt(inputsEditMode.expense),
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateExpenseByIdTrunk({
          token: token,
          product: dataToUpdate.product,
          expense: dataToUpdate.expense,
          expenseId: params.expenseId,
        })
      ).unwrap();
      removeEditMode();
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const onClickDelete = async () => {
    try {
      console.log();
      dispatch(
        deleteExpenseByIdTrunk({
          token: token,
          expenseId: params.expenseId,
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
    return <Navigate to="/" />;
  }
  if (loading) {
    return <Loading/>;
  }
  return (
    <div>
      expenseDetails {params.expenseId}
      <div>
        {editState ? (
          <form onSubmit={submitUpdate}>
            <input
              type="text"
              name="product"
              placeholder={dataExpenseById.product}
              onChange={onChangeHandlerInputs}
              value={inputsEditMode.product}
              required
              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
              title="Just type letters is allowed"
            />
            <input
              type="text"
              name="expense"
              placeholder={dataExpenseById.expense}
              onChange={onChangeHandlerInputs}
              value={inputsEditMode.expense}
              required
              pattern="^[0-9]+$"
              title="Just type number is allowed"
            />
            <button type="submit">Save</button>
            <button onClick={removeEditMode}>Cancel</button>
          </form>
        ) : (
          <div>
            <span>{dataExpenseById.product}</span>
            <strong>${dataExpenseById.expense}</strong>
            <button onClick={editMode}>Update</button>
          </div>
        )}
      </div>
      <small id="mssgIncorrectTyping"></small>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};
