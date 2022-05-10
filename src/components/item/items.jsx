import React from "react";
import { Button } from "../buttons/button";
import "./style/item.css";
import { LinkStandard } from "./../link/Link";

export const Items = (props) => {
  return (
    <>
      {props?.array.map((item) => (
        <li id={`${item._id}`} key={item._id}>
          <Button
            type="button"
            children={
              <LinkStandard
                to={`${props.url}/${item._id}`}
                children={"Details"}
              />
            }
          />
          <span>{item.product}</span>
          <strong>$ {item.income ? item.income : item.expense}</strong>
        </li>
      ))}
    </>
  );
};
