import React from "react";
import { useDispatch } from "react-redux";
import { cleanMsg, getKeyFromLocalStorage, productExpense, sendMsg } from "../../utils/utils";
import { expensePostTrunk } from './expenseSlide';
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { FormRegister } from "../../components/formRegister/formRegister";

export const Expense = () => {
  const token = getKeyFromLocalStorage('token');
  const { product, expense } = productExpense
  const { inputsForm, setInputsForm, onChangeInputsForm } =
  HooksFormOfProducts({ product, expense });
  const dispatch = useDispatch();
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
      sendMsg('mssgIncorrectTyping', 'Item added')
      cleanMsg(2000)
    } catch (error) {
      sendMsg('mssgIncorrectTyping', "Item with name is duplicated")
    }
  };
  if (!token) {
    return <AuthNoLogged />;
  }
  return (
    <section>
      expense
      <FormRegister
        name='expense'
        onSubmitForm={onSubmitForm}
        onChangeInputsForm={onChangeInputsForm}
        inputsFormProduct={inputsForm.product}
        inputsFormRegistered={inputsForm.expense}
        htmlFor='expense'
      />
    </section>
  );    
  };
