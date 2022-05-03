import React from "react";
import { Button } from "../buttons/button";

export const CardStandardIncome = ({editMode, productData, numberData}) => {
    const object = {
        product: productData,
        expense: numberData
    }
  return (
    <div>
      <span>{object.product}</span>
      <strong>${object.expense}</strong>
      <Button onClick={editMode} children='Update'/>
    </div>
  );
};