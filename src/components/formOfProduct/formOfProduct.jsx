import React, { useState } from "react";

export const FormOfProduct = ({onSubmitForm, onChangeInputsForm, inputsIncome}) => {
  return (
    <div>
      formOfProduct
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
              //   value={inputsIncome.income}
              //   onChange={onChangeInputsForm}
              required
              pattern="^[0-9]+$"
              title="Just type number is allowed"
            />
          </label>
          <button type="submit">Click</button>
        </fieldset>
        <small id="mssgIncorrectTyping" />
      </form>
    </div>
  );
};
