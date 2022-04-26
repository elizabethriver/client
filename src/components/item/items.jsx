import React from "react";
import "./style/item.css"
export const Items = (props) => {
    console.log(props)
  return (
    <>
      {props?.array.map((item) => (
        <li id={`${item._id}`} key={item._id}>
          <span>{item.product}</span>
          <strong>{item.income ? item.income : item.expense}</strong>
          <button>Delete</button>
          <button>Details</button>
        </li>
      ))}
    </>
  );
};
