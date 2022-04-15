import React, { useState } from "react";
import { income } from "../../api/api";
import "./style/income.css";

export const Income = () => {
  const token = localStorage.getItem("token");
  const [inputsIncome, setInputsIncome] = useState({ product: "", income: "" });

  const onChangeInputsForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsIncome({ ...inputsIncome, [name]: value });
  };
  const incomeFetch = async () => {
    const example = {
      product: inputsIncome.product,
      income: inputsIncome.income,
    };
    console.log(example);
    const response = await income(token, example.product, example.income);
    console.log(response);
  };
  incomeFetch();
  return (
    <div>
      income
      <form onSubmit={incomeFetch}>
        <label htmlFor="product">Name of product</label>
        <input type="input" name="product" value={onChangeInputsForm} />
        <label htmlFor="income">Income</label>
        <input type="input" name="income" value={onChangeInputsForm} />
      </form>
      <button type="submit">Click</button>
    </div>
  );
};
