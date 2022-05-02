import { useParams, useNavigate, Navigate } from "react-router-dom";

export const Protected = () => {
  console.log("protected");
};
export const setKeyFromLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};
export const getKeyFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const cleanMsg = (timeout) => {
  return setTimeout(() => {
    document.getElementById("mssgIncorrectTyping").innerHTML = "";
  }, timeout);
};
export const sendMsg = (id, msg) => {
  return (document.getElementById(id).innerHTML = msg);
};
