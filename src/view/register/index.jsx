import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/register.css";
import { register } from "../../api/api";

export const Register = () => {
  const [inputsRegister, setInputsRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const onchangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputsRegister({ ...inputsRegister, [name]: value });
    console.log(inputsRegister);
  };

  const submit = async (e) => {
    e.preventDefault();
    let response;
    try {
      
      response = await register(
        inputsRegister.name.trim(),
        inputsRegister.email.trim(),
        inputsRegister.password.trim(),
        inputsRegister.confirmPassword.trim()
      );
      console.log(response);
      setInputsRegister({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.getElementById("mssgIncorrectTyping").innerHTML =
        "Your are register";
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      document.getElementById("mssgIncorrectTyping").innerHTML =
        "Please verify your inputs";
      setTimeout(() => {
        document.getElementById("mssgIncorrectTyping").innerHTML = "";
      }, 2000);
      if (response.data === undefined) {
        return response;
      }
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
