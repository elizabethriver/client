import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanMsg, getKeyFromLocalStorage, sendMsg } from "../../utils/utils";
import { expensePostTrunk } from './expenseSlide';
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";

export const Expense = () => {
  const token = getKeyFromLocalStorage('token');
  const [inputsExpense, setInputsExpense] = useState({
    product: "",
    expense: "",
  });
  const dispatch = useDispatch();
  const onChangeInputsForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsExpense({ ...inputsExpense, [name]: value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        expensePostTrunk({
          token,
          product: inputsExpense.product.trim(),
          expense: parseInt(inputsExpense.expense),
        })
      ).unwrap();
      setInputsExpense({ product: "", expense: "" });
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
              value={inputsExpense.product}
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
              value={inputsExpense.expense}
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
