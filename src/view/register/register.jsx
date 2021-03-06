import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./style/register.css";
import { axiosRegister } from "./registerSlice";
import { useDispatch } from "react-redux";
import { sendMsg, setKeyFromLocalStorage } from "../../utils/utils";
import { HooksFormOfProducts } from "../../components/formOfProduct/hooksFormOfProducts";
import { Button } from "../../components/buttons/button";

export const Register = () => {
  const product = { name: "", email: "", password: "", confirmPassword: "" };
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
    navigate("/");
  };
  const submit = async (e) => {
    e.preventDefault();
    let response = null;
    try {
      response = await dispatch(
        axiosRegister({
          name: inputsForm.name.trim(),
          email: inputsForm.email.trim(),
          password: inputsForm.password.trim(),
          confirmPassword: inputsForm.confirmPassword.trim(),
        })
      ).unwrap();
      // handle result here
      const { name } = response.registerUser;
      setKeyFromLocalStorage("name", name);
      setInputsForm(product);
      sendMsg("mssgIncorrectTyping", `${name} you are registered`);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // handle error here
      console.log(error)
      response = error;
      sendMsg("mssgIncorrectTyping", "Please verify your inputs or email already has a account");
      setTimeout(() => {
        document.getElementById("mssgIncorrectTyping").innerHTML = "";
      }, 2000);
      throw error;
    }
  };

  return (
    <main className="mainLogin">
      <section className="containerLoginSection">
        <h1 className="h1text_center">My Wallet</h1>
        <form onSubmit={submit}>
          <fieldset>
            <label htmlFor="name">
              Username:
              <input
                type="text"
                name="name"
                value={inputsForm.name}
                placeholder="add your name"
                onChange={onChangeInputsForm}
                required
                pattern="^[\w'\-,.][^0-9_!????????/\\+=@#$%??&*(){}|~<>;:[\]]{2,}$"
                title="Please add your name without a number or symbol"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={inputsForm.email}
                placeholder="example@mail.com"
                onChange={onChangeInputsForm}
                required
                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                title="Please add your email (e.g example@mail.com)"
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                value={inputsForm.password}
                placeholder="*******"
                onChange={onChangeInputsForm}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Please enter your password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
              />
              <i onClick={togglePassword}>
                {passwordShown ? (
                  <span className="material-symbols-outlined">visibility</span>
                ) : (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                )}{" "}
              </i>
            </label>
            <label htmlFor="confirmPassword">
              Repeat password:
              <input
                type={passwordShown ? "text" : "password"}
                name="confirmPassword"
                value={inputsForm.confirmPassword}
                placeholder="*******"
                onChange={onChangeInputsForm}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                title="Please enter your password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
              />
              <i onClick={togglePassword}>
                {passwordShown ? (
                  <span className="material-symbols-outlined">visibility</span>
                ) : (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                )}{" "}
              </i>
            </label>
            <Button name="register" type="submit" children="Register" />
          </fieldset>
          <small id="mssgIncorrectTyping" />
        </form>
        <div>
          <span>You have an account? Click</span>
          <Button
            name="hyperlink"
            type="button"
            onClick={handleClick}
            children={<strong> Here</strong>}
          />
        </div>
      </section>
    </main>
  );
};
