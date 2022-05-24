import React from "react";
import { productObject } from "../../utils/utils";
import { Button } from "../buttons/button";
import { IconFonts } from "../iconFonts/iconFonts";
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
      <span>
        {" "}
        <strong>Product: </strong> {(object.product = productData)}
      </span>
      <span className="price_product">
        <strong>Charge: </strong>${(object[name] = priceProduct)}
      </span>
      <div className="container_update">
        <small className="small_update">Update?</small>
        <Button
          name="update_product"
          type="button"
          onClick={editMode}
          children={<IconFonts icon="update" />}
        />
      </div>
    </section>
  );
};
