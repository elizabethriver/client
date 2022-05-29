import React, { useState } from "react";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosLogin } from "./loginslide";
import { cleanMsg, sendMsg, setKeyFromLocalStorage } from "../../utils/utils";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { Button } from "../../components/buttons/button";

export const Login = () => {
  const product = { email: "", password: "" };
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const { inputsForm, setInputsForm, onChangeInputsForm } =
    HooksFormOfProducts(product);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  const submit = async (e) => {
    e.preventDefault();
    let response = null;
    try {
      response = await dispatch(
        axiosLogin({
          email: inputsForm.email.trim(),
          password: inputsForm.password.trim(),
        })
      ).unwrap();
      // handle result here
      const { token, name } = response;
      setKeyFromLocalStorage("token", token);
      setKeyFromLocalStorage("name", name);
      setInputsForm({ email: "", password: "" });
      sendMsg("mssgIncorrectTyping", "Welcome");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      // handle error here
      response = error;
      sendMsg("mssgIncorrectTyping", "Incorrect password or email");
      cleanMsg(2000);
      throw error;
    }
  };

  return (
    <main className="containerLogin">
      <section className="containerLoginSectionLogin displayFlex">
        <h1 className="h1text_center">My Wallet</h1>
        <form onSubmit={submit}>
          <fieldset className="fieldsetLogin">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={inputsForm.email}
                onChange={onChangeInputsForm}
                placeholder="example@mail.com"
                required
                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                title="Please enter your email (e.g example@mail.com)"
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                value={inputsForm.password}
                onChange={onChangeInputsForm}
                placeholder="*******"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                required
                title="Please enter your password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                id="password"
              />
              <i onClick={togglePassword}>
                {passwordShown ? (
                  <span className="material-symbols-outlined">visibility</span>
                ) : (
                  <span className="material-symbols-outlined">visibility_off</span>
                )}{" "}
              </i>
            </label>

            <Button
              className="submit"
              name="login"
              type="submit"
              children="Log In"
            />
          </fieldset>
          <small id="mssgIncorrectTyping" />
        </form>
        <>
          <span>You don't have a account? Click</span>
          <Button
            type="button"
            name="hyperlink"
            onClick={handleClick}
            children={<strong>Here</strong>}
          />
        </>
      </section>
    </main>
  );
};
