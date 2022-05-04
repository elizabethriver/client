import React from "react";
import { useDispatch } from "react-redux";
import "./style/income.css";
import { incomePostTrunk } from "./incomeSlide";
import { cleanMsg, getKeyFromLocalStorage, sendMsg } from "../../utils/utils";
import { AuthNoLogged } from "../../components/authNoLogged/authNoLogged";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { Button } from "./../../components/buttons/button";

export const Income = () => {
  const token = getKeyFromLocalStorage("token");
  const product = { product: "", income: "" };
  const { inputsForm, setInputsForm, onChangeInputsForm } =
    HooksFormOfProducts(product);
  const dispatch = useDispatch();
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
      setInputsForm(product);
      sendMsg("mssgIncorrectTyping", "Item added");
      cleanMsg(2000);
    } catch (error) {
      sendMsg("mssgIncorrectTyping", "Item with name is duplicated");
    }
  };
  if (!token) {
    return <AuthNoLogged />;
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
              value={inputsForm.product}
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
              value={inputsForm.income}
              onChange={onChangeInputsForm}
              required
              pattern="^[0-9]+$"
              title="Just type number is allowed"
            />
          </label>
          <Button type="submit" children="Click" />
        </fieldset>
        <small id="mssgIncorrectTyping" />
      </form>
    </section>
  );
};
