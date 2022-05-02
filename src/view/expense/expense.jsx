import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanMsg, getKeyFromLocalStorage, sendMsg } from "../../utils/utils";
import { expensePostTrunk } from './expenseSlide';
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";

export const Expense = () => {
  const token = getKeyFromLocalStorage('token');
  const product = { product: "", expense: "" };
  const { inputsForm, setInputsForm, onChangeInputsForm } =
  HooksFormOfProducts(product);
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
      setInputsForm(product);
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
      <form onSubmit={onSubmitForm}>
        <fieldset>
          <label htmlFor="product">
            Name of product
            <input
              type="text"
              name="product"
              placeholder="add your product"
              onChange={onChangeInputsForm}
              value={inputsForm.product}
              required
              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
              title="Just type letters is allowed"
            />
          </label>
          <label htmlFor="expense">
            Expense
            <input
              type="text"
              name="expense"
              placeholder="add your expense"
              value={inputsForm.expense}
              onChange={onChangeInputsForm}
              required
              pattern="^[0-9]+$"
              title="Just type number is allowed"
            />
          </label>
          <button type="submit">Click</button>
        </fieldset>
        <small id="mssgIncorrectTyping" />
      </form>
    </section>
  );    
  };
