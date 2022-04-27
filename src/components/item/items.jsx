import React from "react";
import { Link } from "react-router-dom";
import "./style/item.css";

export const Items = (props) => {
  return (
    <>
      {props?.array.map((item) => (
        <li id={`${item._id}`} key={item._id}>
          <button>
            <Link to={`${props.url}/${item._id}`}>Details</Link>
          </button>
          <span>{item.product}</span>
          <strong>$ {item.income ? item.income : item.expense}</strong>
        </li>
      ))}
    </>
  );
};
