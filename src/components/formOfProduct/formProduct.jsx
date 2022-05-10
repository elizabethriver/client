import React from "react";
import { Button } from "../buttons/button";

export const FormProduct = ({
  name,
  submitUpdate,
  onChangeInputsForm,
  removeEditMode,
  dataProductNameUpdated,
  dataNumberUpdated,
}) => {

  return (
    <form onSubmit={submitUpdate}>
      <input
        type="text"
        name="product"
        placeholder={dataProductNameUpdated}
        onChange={onChangeInputsForm}
        required
        pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
        title="Just type letters is allowed"
      />
      <input
        type="text"
        name={name}
        placeholder={dataNumberUpdated}
        onChange={onChangeInputsForm}
        required
        pattern="^[0-9]+$"
        title="Just type number is allowed"
      />
      <Button type="submit" children="Save" />
      <Button type="button" onClick={removeEditMode} children="Cancel" />
    </form>
  );
};
