import React from "react";
import { productObject } from "../../utils/utils";
import { Button } from "../buttons/button";

export const CardStandardProduct = ({
  name,
  editMode,
  productData,
  numberData,
}) => {
  let object = productObject(name);
  return (
    <div>
      <span>{(object.product = productData)}</span>
      <strong>${(object[name] = numberData)}</strong>
      <Button onClick={editMode} children="Update" />
    </div>
  );
};
