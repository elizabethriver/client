import { Navigate } from "react-router-dom";

export const Protected = () => {
    console.log('protected')
}

export const setKeyFromLocalStorage = (key, value) => {
    return localStorage.setItem(key, value);
}
export const getKeyFromLocalStorage = (key) => {
    return localStorage.getItem(key);

}

