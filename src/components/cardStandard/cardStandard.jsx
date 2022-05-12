import React from "react";
import { productObject } from "../../utils/utils";
import { Button } from "../buttons/button";
import "./style/cardStandard.css";

export const CardStandardProduct = ({
  name,
  editMode,
  productData,
  numberData,
}) => {
  let object = productObject(name);
  const priceProduct = new Intl.NumberFormat().format(numberData);
  return (
    <section className="cardStandard">
      <span>{(object.product = productData)}</span>
      <strong className="price_product">
        ${(object[name] = priceProduct)}
      </strong>
      <Button
        name="update_product"
        type="button"
        onClick={editMode}
        children="Update"
      />
    </section>
  );
};
