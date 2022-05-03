import React from "react";
import { Button } from "../buttons/button";

export const FormExpense = ({
  submitUpdate,
  dataIncomeById,
  onChangeInputsForm,
  inputsForm,
  removeEditMode,
  product,
  registerNumber
}) => {
  return (
    <form onSubmit={submitUpdate}>
      <input
        type="text"
        name={product}
        placeholder={dataIncomeById.product}
        onChange={onChangeInputsForm}
        value={inputsForm.product}
        required
        pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
        title="Just type letters is allowed"
      />
      <input
        type="text"
        name={registerNumber}
        placeholder={dataIncomeById.expense}
        onChange={onChangeInputsForm}
        value={inputsForm.expense}
        required
        pattern="^[0-9]+$"
        title="Just type number is allowed"
      />
      <Button type='submit' children='Save'/>
      <button onClick={removeEditMode}>Cancel</button>
    </form>
  );
};
