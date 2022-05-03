import React from "react";
import { productObject } from "../../utils/utils";
import { Button } from "../buttons/button";

export const CardStandardProduct = ({name, editMode, productData, numberData}) => {
  let object = productObject(name) 
  object = {productData, numberData}
  return (
    <div>
      <span>{object.productData}</span>
      <strong>${object.numberData}</strong>
      <Button onClick={editMode} children='Update'/>
    </div>
  );
};