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
  return (
    <form onSubmit={onSubmitForm}>
      <fieldset>
        <label htmlFor="product">
          Name of product
          <input
            type="text"
            name="product"
            placeholder="add your product"
            onChange={onChangeInputsForm}
            value={inputsFormProduct}
            required
            pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
            title="Just type letters is allowed"
          />
        </label>
        <label htmlFor={htmlFor}>
          Income
          <input
            type="text"
            name={name}
            placeholder="add your product"
            value={inputsFormRegistered}
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
  );
};
