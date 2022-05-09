export const setKeyFromLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};
export const getKeyFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const removeKeyFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
export const cleanMsg = (timeout) => {
  return setTimeout(() => {
    document.getElementById("mssgIncorrectTyping").innerHTML = "";
  }, timeout);
};
export const sendMsg = (id, msg) => {
  return (document.getElementById(id).innerHTML = msg);
};
export const productObject = (name) => {
  const item = {
    product: "",
    [name]: "",
  };
  return item;
};
export const productExpense = { product: "", expense: "" };
export const productIncome = { product: "", income: "" };


