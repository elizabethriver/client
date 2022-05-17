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
      <nav className="container_nav">
        {userToken !== null ? (
          <>
            <li>
              <LinkStandard name="link" to="/dashboard" children="Dashboard" />
            </li>
            <li>
              <LinkStandard name="link" to={"/income"} children={"Income"} />
            </li>
            <li>
              <LinkStandard name="link" to={"/expense"} children={"Expense"} />
            </li>
            <div>
              <li>
                <Button
                  type="button"
                  name="link"
                  onClick={logOut}
                  children="Log Out"
                />
              </li>
            </div>
          </>
        ) : (
          <></>
        )}
      </nav>
      <Outlet />
    </header>
  );
};
