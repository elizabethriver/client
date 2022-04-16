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
  const onSubmitForm = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await income(
        token,
        inputsIncome.product,
        parseInt(inputsIncome.income)
      );
      console.log(response.data);
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
