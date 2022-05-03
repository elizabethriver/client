import React from "react";

export const CardStandardExpense = ({editMode, productData, numberData}) => {
    const object = {
        product: productData,
        expense: numberData
    }
  return (
    <div>
      <span>{object.product}</span>
      <strong>${object.expense}</strong>
      <button onClick={editMode}>Update</button>
    </div>
  );
};
