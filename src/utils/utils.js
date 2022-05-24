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
export const reduceBalance = (incomeAllDashboardData, expenseAllDashboardData) => {
  const arrayListIncome = incomeAllDashboardData.map((item) => item.income)
  const arrayListExpense = expenseAllDashboardData.map((item) => item.expense)
  const reduceIncome = arrayListIncome.reduce((valorAnterior, valorActual)=> {
    return valorAnterior + valorActual;
  }, 0);
  const reduceExpense = arrayListExpense.reduce((valorAnterior, valorActual)=> {
    return valorAnterior + valorActual;
  }, 0);
  const balance = new Intl.NumberFormat().format(reduceIncome - reduceExpense);
  return balance
}
export const objectValuesListI = (array) => {
  return array.map((item) => {
    const picked = (({ product, income }) => ({ product, income }))(item);
    const pickedDu = { name: picked.product, value: picked.income };
    return pickedDu;
  });
} 
export const objectValuesListE = (array) => {
  return array.map((item) => {
    const picked = (({ product, expense }) => ({ product, expense }))(item);
    const pickedDu = { name: picked.product, value: picked.expense };
    return pickedDu;
  });
} 
