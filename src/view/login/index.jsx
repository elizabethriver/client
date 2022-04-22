import React, { useState } from "react";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginslide, { axiosLogin } from "./loginslide";

export const Login = () => {
  const [inputForm, setInputForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  const changeInputsForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    dispatch(
      axiosLogin({
        email: inputForm.email.trim(),
        password: inputForm.password.trim(),
      })
    )
      .then((response) => {
        const { token } = response.payload;
        localStorage.setItem("token", token);
        setInputForm({ email: "", password: "" });
        document.getElementById("mssgIncorrectTyping").innerHTML = "Welcome";
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        document.getElementById("mssgIncorrectTyping").innerHTML =
          "Incorrect password or email";
        setTimeout(() => {
          document.getElementById("mssgIncorrectTyping").innerHTML = "";
        }, 2000);
        throw error;
      });
  };

  return (
    <main className="containerLogin">
      <figure>
        <img
          className="image_login"
          src="https://i.ibb.co/WGPHHBp/3071357.jpg"
          alt="login user"
        />
      </figure>
      <section className="containerLoginSectionLogin displayFlex">
        Login
        <div>
          <form onSubmit={submit}>
            <fieldset>
              <label htmlFor="email">
                email:
                <input
                  type="input"
                  name="email"
                  value={inputForm.email}
                  onChange={changeInputsForm}
                  placeholder="example@mail.com"
                  required
                  pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                  title="Please enter your email (e.g example@mail.com)"
                />
              </label>
              <label htmlFor="password">
                password:
                <input
                  type="input"
                  name="password"
                  value={inputForm.password}
                  onChange={changeInputsForm}
                  placeholder="*******"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  required
                  title="Please enter your password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                />
              </label>
              <button type="submit">Log In</button>
            </fieldset>
            <small id="mssgIncorrectTyping" />
          </form>
        </div>
        <div>
          <span>You dont have a account? Click</span>
          <button onClick={handleClick}>here</button>
        </div>
      </section>
    </main>
  );
};
