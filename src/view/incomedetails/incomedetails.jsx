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
import { getKeyFromLocalStorage, sendMsg } from "../../utils/utils";
import { Loading } from "../../components/loading/loading";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { EditMode } from "../../components/editMode/EditMode";
import { CardStandardIncome } from "../../components/cardStandard/cardStandardIncome";
import { FormIncome } from "../../components/formOfProduct/formIncome";
import { Button } from "../../components/buttons/button";

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
  return (
    <div>
      IncomeDetails {params.incomeId}
      <div>
        {editState ? (
          <FormIncome
            submitUpdate={submitUpdate}
            dataIncomeById={dataIncomeById}
            onChangeInputsForm={onChangeInputsForm}
            inputsForm={inputsForm}
            removeEditMode={removeEditMode}
            product='product'
            registerNumber='income'
          />
        ) : (
          <CardStandardIncome
            editMode={editMode}
            productData={dataIncomeById.product}
            numberData={dataIncomeById.income}
          />
        )}
      </div>
      <Button onClick={onClickDelete} children='Delete'/>
      <small id="mssgIncorrectTyping"></small>
    </div>
  );
};
