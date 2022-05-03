import React, { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/expensedetails.css";
import {
  getExpenseByIdTrunk,
  updateExpenseByIdTrunk,
  deleteExpenseByIdTrunk,
} from "./expenseDetailsSlice";
import { getKeyFromLocalStorage, sendMsg } from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { EditMode } from "../../components/editMode/EditMode";
import { CardStandardExpense } from "../../components/cardStandard/cardStandardExpense";
import { FormExpense } from "../../components/formOfProduct/formExpense";
import { Button } from "../../components/buttons/button";

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
  const { editState, editMode, removeEditMode } = EditMode();
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
      setInputsForm(product);
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
          <FormExpense
          submitUpdate={submitUpdate}
          dataIncomeById={dataExpenseById}
          onChangeInputsForm={onChangeInputsForm}
          inputsForm={inputsForm}
          removeEditMode={removeEditMode}
          product='product'
          registerNumber='expense'
          />
        ) : (
          <CardStandardExpense
            editMode={editMode}
            productData={dataExpenseById.product}
            numberData={dataExpenseById.expense}
          />
        )}
      </div>
      <small id="mssgIncorrectTyping"></small>
      <Button onClick={onClickDelete} children='Delete'/>
    </div>
  );
};
