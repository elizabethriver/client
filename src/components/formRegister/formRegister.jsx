import React from "react";
import { Button } from "../buttons/button";

export const FormRegister = ({
  name,
  onSubmitForm,
  onChangeInputsForm,
  inputsFormProduct,
  inputsFormRegistered,
  htmlFor
}) => {
  const classFieldset = name=== 'income' ? 'classIncomeFieldset' : 'classExpenseFieldset'
  return (
    <form onSubmit={onSubmitForm}>
      <fieldset className={classFieldset}>
        <label htmlFor="product">
          Name of product: {''}
          <input
            type="text"
            name="product"
            placeholder="add product's name"
            onChange={onChangeInputsForm}
            value={inputsFormProduct}
            required
            pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
            title="Just type letters is allowed"
          />
        </label>
        <label htmlFor={htmlFor}>
          Register charge: {''}
          <input
            type="text"
            name={name}
            placeholder="add charge"
            value={inputsFormRegistered}
            onChange={onChangeInputsForm}
            required
            pattern="^[0-9]+$"
            title="Just type number is allowed"
          />
        </label>
        <Button name='register_product' type="submit" children="Click" />
      </fieldset>
      <small id="mssgIncorrectTyping" />
    </form>
  );
};
