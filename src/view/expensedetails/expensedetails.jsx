import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/expensedetails.css";
import {
  getExpenseByIdTrunk,
  updateExpenseByIdTrunk,
  deleteExpenseByIdTrunk,
} from "./expenseDetailsSlice";
import {
  getKeyFromLocalStorage,
  sendMsg,
} from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";

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
  const product = { product: "", expense: "" };
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
    expense: parseInt(inputsForm.expense),
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
      setInputsForm(product)
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
      sendMsg("mssgIncorrectTyping", "Deleting");
      removeEditMode();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      sendMsg("mssgIncorrectTyping", "Error with deleting");
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
      expenseDetails {params.expenseId}
      <div>
        {editState ? (
          <form onSubmit={submitUpdate}>
            <input
              type="text"
              name="product"
              placeholder={dataExpenseById.product}
              onChange={onChangeInputsForm}
              value={inputsForm.product}
              required
              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
              title="Just type letters is allowed"
            />
            <input
              type="text"
              name="expense"
              placeholder={dataExpenseById.expense}
              onChange={onChangeInputsForm}
              value={inputsForm.expense}
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
