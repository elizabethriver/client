import React from "react";
import "./style/item.css";
export const Items = (props) => {
  return (
    <>
      {props?.array.map((item) => (
        <li id={`${item._id}`} key={item._id}>
          <button>Details</button>
          <span>{item.product}</span>
          <strong>$ {item.income ? item.income : item.expense}</strong>
        </li>
      ))}
    </>
  );
};
