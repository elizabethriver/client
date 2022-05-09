import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanMsg,
  getKeyFromLocalStorage,
  productExpense,
  sendMsg,
} from "../../utils/utils";
import { expensePostTrunk } from "./expenseSlide";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { FormRegister } from "../../components/formRegister/formRegister";
import { Loading } from "../../components/loading/loading";

export const Expense = () => {
  const token = getKeyFromLocalStorage("token");
  const { product, expense } = productExpense;
  const { inputsForm, setInputsForm, onChangeInputsForm } = HooksFormOfProducts(
    { product, expense }
  );
  const dispatch = useDispatch();
  const { loading, status } = useSelector((state) => state.dataPostExpense);
  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        expensePostTrunk({
          token,
          product: inputsForm.product.trim(),
          expense: parseInt(inputsForm.expense),
        })
      ).unwrap();
      setInputsForm({ product, expense });
      sendMsg("mssgIncorrectTyping", "Item added");
      cleanMsg(2000);
    } catch (error) {
      sendMsg("mssgIncorrectTyping", "Item with name is duplicated");
    }
  };
  if (!token) {
    return <AuthNoLogged />;
  }
  if (status !== null) {
    return <AuthNoLogged />;
  }
  if (loading) return <Loading />;
  return (
    <section>
      expense
      <FormRegister
        name="expense"
        onSubmitForm={onSubmitForm}
        onChangeInputsForm={onChangeInputsForm}
        inputsFormProduct={inputsForm.product}
        inputsFormRegistered={inputsForm.expense}
        htmlFor="expense"
      />
    </section>
  );
};
