import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./style/index.css";

export const Register = () => {
 
    let navigate = useNavigate();
  
    function handleClick() {
      navigate("/login");
    }
    function submit(e) {
      
    }
  
  return (
    <main className='mainLogin'>
      <figure>
        <img className="image_login" src="https://i.ibb.co/xHZrhpn/Music-Icon.jpg" alt="" srcset="" />
      </figure>
      <section className="containerLoginSection displayFlex">
        Register
        <div>
          <form onSubmit={submit}>
            <fieldset>
            <label htmlFor="">
                name:
                <input type="input" value="" placeholder="example@mail.com" />
              </label>
              <label htmlFor="">
                email:
                <input type="input" value="" placeholder="example@mail.com" />
              </label>
              <label htmlFor="">
                password:
                <input type="input" value="" placeholder="*******" />
              </label>
              <label htmlFor="">
                Repeat password:
                <input type="input" value="" placeholder="*******" />
              </label>
              <button type="submit">Register</button>
            </fieldset>
          </form>
        </div>
        <div>
          <span>You have a account? Click</span>
          <button onClick={handleClick}>here</button>
        </div>
      </section>
    </main>
  )
}
