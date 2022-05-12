import React from "react";
import { Button } from "../buttons/button";
import "./style/item.css";
import { LinkStandard } from "./../link/Link";

export const Items = (props) => {
  return (
    <>
      {props?.array.map((item) => {
        const priceIncome = new Intl.NumberFormat().format(item.income);
        const priceExpense = new Intl.NumberFormat().format(item.expense);
        return (
          <li className="container_list" id={`${item._id}`} key={item._id}>
            <Button
              name="details_link"
              type="button"
              children={
                <LinkStandard
                  to={`${props.url}/${item._id}`}
                  children={
                    <span className="item_product">{item.product}</span>
                  }
                />
              }
            />
            <strong className="item_price">
              ${''}{isNaN(priceIncome) ? priceExpense : priceIncome}
            </strong>
          </li>
        );
      })}
    </>
  );
};
