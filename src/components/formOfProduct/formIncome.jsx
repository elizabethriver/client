import React from "react";

export const FormIncome = ({
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
        placeholder={dataIncomeById.income}
        onChange={onChangeInputsForm}
        value={inputsForm.income}
        required
        pattern="^[0-9]+$"
        title="Just type number is allowed"
      />
      <button type="submit">Save</button>
      <button onClick={removeEditMode}>Cancel</button>
    </form>
  );
};
