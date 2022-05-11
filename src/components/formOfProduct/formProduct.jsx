import React from "react";
import { Button } from "../buttons/button";
import "./style/formProduct.css";

export const FormProduct = ({
  name,
  submitUpdate,
  onChangeInputsForm,
  removeEditMode,
  dataProductNameUpdated,
  dataNumberUpdated,
}) => {
  return (
    <form className="formUpdate" onSubmit={submitUpdate}>
      <input
        className="updateForm"
        type="text"
        name="product"
        placeholder={dataProductNameUpdated}
        onChange={onChangeInputsForm}
        required
        pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
        title="Just type letters is allowed"
      />
      <input
        className="updateForm"
        type="text"
        name={name}
        placeholder={dataNumberUpdated}
        onChange={onChangeInputsForm}
        required
        pattern="^[0-9]+$"
        title="Just type number is allowed"
      />
      <Button  name='update_product' type="submit" children="Save" />
      <Button name='update_product' type="button" onClick={removeEditMode} children="Cancel" />
    </form>
  );
};
