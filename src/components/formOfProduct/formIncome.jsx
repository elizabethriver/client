import React from "react";
import { productObject } from "../../utils/utils";
import { Button } from "../buttons/button";

export const FormIncome = ({
  name,
  submitUpdate,
  onChangeInputsForm,
  inputsFormProduct,
  inputsFormNumber,
  removeEditMode,
  dataProductNameUpdated,
  dataNumberUpdated,
}) => {
  let object = productObject(name);

  object = { inputsFormProduct, inputsFormNumber };
  console.log(object);
  return (
    <form onSubmit={submitUpdate}>
      <input
        type="text"
        name="product"
        placeholder={dataProductNameUpdated}
        onChange={onChangeInputsForm}
        // value={inputsFormProduct}
        required
        pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
        title="Just type letters is allowed"
      />
      <input
        type="text"
        name={name}
        placeholder={dataNumberUpdated}
        onChange={onChangeInputsForm}
        // value={inputsFormNumber}
        required
        pattern="^[0-9]+$"
        title="Just type number is allowed"
      />
      <Button type="submit" children="Save" />
      <Button onClick={removeEditMode} children="Cancel" />
    </form>
  );
};
