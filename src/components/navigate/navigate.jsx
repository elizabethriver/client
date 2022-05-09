import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style/navigate.css";
import { LinkStandard } from "./../link/Link";
import {
  getKeyFromLocalStorage,
  removeKeyFromLocalStorage,
} from "../../utils/utils";
import { Button } from "./../buttons/button";

export const Navigate = () => {
  const userToken = getKeyFromLocalStorage("token");
  let navigate = useNavigate();
  const logOut = () => {
    removeKeyFromLocalStorage("token");
    removeKeyFromLocalStorage("name");
    navigate("/");
  };
  return (
    <header>
      <nav>
        <div className='container_nav'>
          <li>
            <LinkStandard to="/dashboard" children="Dashboard" />
          </li>
          <li>
            <LinkStandard to={"/income"} children={"Income"} />
          </li>
          <li>
            <LinkStandard to={"/expense"} children={"Expense"} />
          </li>
        </div>
        <div>
          {userToken ? (
            <li>
              <Button type='link' onClick={logOut} children="Log Out" />
            </li>
          ) : (
            <li>
              <LinkStandard to="/" children="Log In" />
            </li>
          )}
        </div>
      </nav>
      <Outlet />
    </header>
  );
};
