import React, { useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/expensedetails.css";
import {
  getExpenseByIdTrunk,
  updateExpenseByIdTrunk,
  deleteExpenseByIdTrunk,
} from "./expenseDetailsSlice";
import {
  getKeyFromLocalStorage,
  productExpense,
  sendMsg,
} from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { EditMode } from "../../components/editMode/EditMode";
import { Button } from "../../components/buttons/button";
import { CardStandardProduct } from "../../components/cardStandard/cardStandard";
import { FormProduct } from "../../components/formOfProduct/formProduct";
import { NotFound } from "../notfound/notfound";

export const ExpenseDetails = () => {
  const token = getKeyFromLocalStorage("token");
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataExpenseById, loading } = useSelector(
    (state) => state.getExpenseByID
  );
  const initFetch = useCallback(() => {
    dispatch(
      getExpenseByIdTrunk({ token: token, expenseId: params.expenseId })
    );
  }, [dispatch, params.expenseId, token]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  const { product, expense } = productExpense;
  const { inputsForm, setInputsForm, onChangeInputsForm } = HooksFormOfProducts(
    { product, expense }
  );
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
      setInputsForm({ product, expense });
      removeEditMode();
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const onClickDelete = async () => {
    try {
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
  if (dataExpenseById.length === 0) {
    return <NotFound />;
  }
  return (
    <main>
      <div className="container_details">
        <h1>Details's product</h1>
        <>
          {editState ? (
            <FormProduct
              name="expense"
              submitUpdate={submitUpdate}
              onChangeInputsForm={onChangeInputsForm}
              inputsFormProduct={dataToUpdate.product}
              inputsFormNumber={dataToUpdate.expense}
              removeEditMode={removeEditMode}
              dataProductNameUpdated={dataExpenseById.product}
              dataNumberUpdated={dataExpenseById.expense}
            />
          ) : (
            <CardStandardProduct
              name="expense"
              editMode={editMode}
              productData={dataExpenseById.product}
              numberData={dataExpenseById.expense}
            />
          )}
        </>
        <Button name='delete_product' type="button" onClick={onClickDelete} children="Delete" />
        <small id="mssgIncorrectTyping"></small>
      </div>
    </main>
  );
};
