import React from "react";
import "./style/index.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate();
  
    function handleClick() {
      navigate("/register");
    }
    function submit(e) {
      
    }
  
  return (
    <main className="containerLogin">
      <figure>
        <img className="image_login" src="https://i.ibb.co/xHZrhpn/Music-Icon.jpg" alt="" srcset="" />
      </figure>
      <section className="containerLoginSection displayFlex">
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
