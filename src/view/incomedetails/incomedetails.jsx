/* eslint-disable no-useless-escape */
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style/incomedetails.css";
import {
  getIncomeByIdTrunk,
  updateIncomeByIdTrunk,
  deleteIncomeByIdTrunk,
} from "./incomeDetailsSlice";
import {
  getKeyFromLocalStorage,
  productIncome,
  sendMsg,
} from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { EditMode } from "../../components/editMode/EditMode";
import { CardStandardProduct } from "../../components/cardStandard/cardStandard";
import { FormProduct } from "../../components/formOfProduct/formProduct";
import { Button } from "../../components/buttons/button";
import { NotFound } from "../notfound/notfound";

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
  const { product, income } = productIncome;
  const { inputsForm, setInputsForm, onChangeInputsForm } = HooksFormOfProducts(
    { product, income }
  );
  const { editState, editMode, removeEditMode } = EditMode();
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
      setInputsForm({ product, income });
      removeEditMode();
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const onClickDelete = async () => {
    try {
      dispatch(
        deleteIncomeByIdTrunk({
          token: token,
          incomeId: params.incomeId,
        })
      ).unwrap();
      sendMsg("mssgIncorrectTyping", "Deleting");
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
  if (dataIncomeById.length === 0) {
    return <NotFound />;
  }
  return (
    <main>
      <div className="container_details">
        <h1>Details's product</h1>
        <>
          {editState ? (
            <FormProduct
              name="income"
              submitUpdate={submitUpdate}
              onChangeInputsForm={onChangeInputsForm}
              inputsFormProduct={dataToUpdate.product}
              inputsFormNumber={dataToUpdate.income}
              removeEditMode={removeEditMode}
              dataProductNameUpdated={dataIncomeById.product}
              dataNumberUpdated={dataIncomeById.income}
            />
          ) : (
            <CardStandardProduct
              name="income"
              editMode={editMode}
              productData={dataIncomeById.product}
              numberData={dataIncomeById.income}
            />
          )}
        </>
        <Button name='delete_product' type="button" onClick={onClickDelete} children="Delete" />
        <small id="mssgIncorrectTyping"></small>
      </div>
    </main>
  );
};
