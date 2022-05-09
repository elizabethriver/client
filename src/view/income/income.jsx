import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/income.css";
import { incomePostTrunk } from "./incomeSlide";
import { cleanMsg, getKeyFromLocalStorage, productIncome, sendMsg } from "../../utils/utils";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { FormRegister } from './../../components/formRegister/formRegister';

export const Income = () => {
  const token = getKeyFromLocalStorage("token");
  const {product, income} = productIncome
  const { inputsForm, setInputsForm, onChangeInputsForm } =
    HooksFormOfProducts({product, income});
  const dispatch = useDispatch();
  const { loading, status } = useSelector((state) => state.dataPostExpense);
  console.log(loading, status);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        incomePostTrunk({
          token,
          product: inputsForm.product.trim(),
          income: parseInt(inputsForm.income),
        })
      ).unwrap();
      setInputsForm({product, income});
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
  return (
    <section>
      income
      <FormRegister
        name='income'
        onSubmitForm={onSubmitForm}
        onChangeInputsForm={onChangeInputsForm}
        inputsFormProduct={inputsForm.product}
        inputsFormRegistered={inputsForm.income}
        htmlFor='income'
      />
    </section>
  );
};
