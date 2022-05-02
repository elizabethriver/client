import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/register.css";
import { axiosRegister } from "./registerSlice";
import { useDispatch } from "react-redux";
import { sendMsg, setKeyFromLocalStorage } from "../../utils/utils";

export const Register = () => {
  
  const [inputsRegister, setInputsRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const onchangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputsRegister({ ...inputsRegister, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        axiosRegister({
          name: inputsRegister.name.trim(),
          email: inputsRegister.email.trim(),
          password: inputsRegister.password.trim(),
          confirmPassword: inputsRegister.confirmPassword.trim(),
        })
      ).unwrap();
      // handle result here
      const { name } = response.registerUser;
      setKeyFromLocalStorage("name", name)
      setInputsRegister({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      sendMsg("mssgIncorrectTyping", `${name}Your are register`)
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // handle error here
      sendMsg("mssgIncorrectTyping","Please verify your inputs")
      setTimeout(() => {
        document.getElementById("mssgIncorrectTyping").innerHTML = "";
      }, 2000);
      throw error;
    }
  };

  return (
    <main className="mainLogin">
      <figure>
        <img
          className="image_register"
          src="https://i.ibb.co/2hhgKXF/3094352.jpg"
          alt=""
        />
      </figure>
      <section className="containerLoginSection displayFlex">
        Register
        <div>
          <form onSubmit={submit}>
            <fieldset>
              <label htmlFor="name">
                name:
                <input
                  type="input"
                  name="name"
                  value={inputsRegister.name}
                  placeholder="add your name"
                  onChange={onchangeHandler}
                  required
                  pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
                  title="Please add your name without a number or symbol"
                />
              </label>
              <label htmlFor="email">
                email:
                <input
                  type="input"
                  name="email"
                  value={inputsRegister.email}
                  placeholder="example@mail.com"
                  onChange={onchangeHandler}
                  required
                  pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                  title="Please add your email (e.g example@mail.com)"
                />
              </label>
              <label htmlFor="password">
                password:
                <input
                  type="input"
                  name="password"
                  value={inputsRegister.password}
                  placeholder="*******"
                  onChange={onchangeHandler}
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  title="Please enter your password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                />
              </label>
              <label htmlFor="confirmPassword">
                Repeat password:
                <input
                  type="input"
                  name="confirmPassword"
                  value={inputsRegister.confirmPassword}
                  placeholder="*******"
                  onChange={onchangeHandler}
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  title="Please enter your password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                />
              </label>
              <button type="submit">Register</button>
            </fieldset>
            <small id="mssgIncorrectTyping" />
          </form>
        </div>
        <div>
          <span>You have a account? Click</span>
          <button onClick={handleClick}>here</button>
        </div>
      </section>
    </main>
  );
};
