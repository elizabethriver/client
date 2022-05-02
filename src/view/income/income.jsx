import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style/income.css";
import { incomePostTrunk } from "./incomeSlide";
import { getKeyFromLocalStorage } from "../../utils/utils";
import { Navigate } from 'react-router-dom';

export const Income = () => {
  const token = getKeyFromLocalStorage('token');
  const [inputsIncome, setInputsIncome] = useState({ product: "", income: "" });
  const dispatch = useDispatch();
  const onChangeInputsForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsIncome({ ...inputsIncome, [name]: value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        incomePostTrunk({
          token,
          product: inputsIncome.product.trim(),
          income: parseInt(inputsIncome.income),
        })
      ).unwrap();
      setInputsIncome({ product: "", income: "" });
      document.getElementById("mssgIncorrectTyping").innerHTML = "Item added";
      setTimeout(() => {
        document.getElementById("mssgIncorrectTyping").innerHTML = "";
      }, 2000);
    } catch (error) {
      document.getElementById("mssgIncorrectTyping").innerHTML =
        "Item with name is duplicated";
    }
  };
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <section>
      income
      <form onSubmit={onSubmitForm}>
        <fieldset>
          <label htmlFor="product">
            Name of product
            <input
              type="text"
              name="product"
              placeholder="add your product"
              onChange={onChangeInputsForm}
              value={inputsIncome.product}
              required
              pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
              title="Just type letters is allowed"
            />
          </label>
          <label htmlFor="income">
            Income
            <input
              type="text"
              name="income"
              placeholder="add your income"
              value={inputsIncome.income}
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
