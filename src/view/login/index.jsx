import React from "react";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import { login} from "../../api/api";

export const Login = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  }
  const submit = async(e) =>{
    e.preventDefault()
    const y = await login()
    console.log('gere', y)
  }
  

  return (
    <main className="containerLogin">
      <figure>
        <img
          className="image_login"
          src="https://i.ibb.co/WGPHHBp/3071357.jpg"
          alt=""
        />
      </figure>
      <section className="containerLoginSectionLogin displayFlex">
        Login
        <div>
          <form onSubmit={submit}>
            <fieldset>
              <label htmlFor="">
                email:
                <input type="input" value="" placeholder="example@mail.com" />
              </label>
              <label htmlFor="">
                password:
                <input type="input" value="" placeholder="*******" />
              </label>
              <button type="submit">Log In</button>
            </fieldset>
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
