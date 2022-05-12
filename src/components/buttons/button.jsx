import React from "react";
import "./style/button.css";

export const Button = ({ type, name, onClick, children }) => {
  let classButton = "";
  switch (name) {
    case "link":
      classButton = "classLink";
      break;
    case "login":
      classButton = "classButtonLogin";
      break;
    case "register":
      classButton = "classButtonRegister";
      break;
    case "details_link":
      classButton = "classButtonDetailsLink";
      break;
    case "register_product":
      classButton = "classButtonRegisterProduct";
      break;
    case "update_product":
      classButton = "classButtonUpdateProduct";
      break;
      case "delete_product":
        classButton = "classButtonDeleteProduct";
        break;
    default:
    // code block
  }
  return (
    <button
      className={`${classButton} button_link`}
      type={type}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
