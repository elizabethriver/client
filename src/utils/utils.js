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

export const setToken = (token) => {
    return localStorage.setItem("token", token);
}
export const getToken = (token) => {
    return localStorage.getItem(token);

}
export const setName = (name) => {
    return localStorage.setItem("name", name);
}
export const getName = (name) => {
    return localStorage.getItem(name);

}
