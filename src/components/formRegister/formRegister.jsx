import React from "react";
import { Button } from "../buttons/button";
import './style/formRegister.css'

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
      <fieldset className='classFieldset'>
        <label htmlFor="product">
          Product: {''}
          <input
          className="inputRegisterProduct"
            type="text"
            name="product"
            placeholder="product's name"
            onChange={onChangeInputsForm}
            value={inputsFormProduct}
            required
            pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
            title="Just type letters is allowed"
          />
        </label>
        <label htmlFor={htmlFor}>
          Charge: {''}
          <input
          className="inputRegisterProduct"
            type="text"
            name={name}
            placeholder="charge"
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
