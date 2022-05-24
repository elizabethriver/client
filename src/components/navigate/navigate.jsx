import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style/navigate.css";
import { LinkStandard } from "./../link/Link";
import {
  getKeyFromLocalStorage,
  removeKeyFromLocalStorage,
} from "../../utils/utils";
import { Button } from "./../buttons/button";
import "material-symbols";
import { IconFonts } from "./../iconFonts/iconFonts";

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
              <LinkStandard
                name="link"
                to="/dashboard"
                children={<IconFonts icon="home" label="My wallet" />}
              />
            </li>
            <li>
              <LinkStandard
                name="link"
                to={"/income"}
                children={<IconFonts icon="add" label="Income" />}
              />
            </li>
            <li>
              <LinkStandard
                name="link"
                to={"/expense"}
                children={<IconFonts icon="remove" label="Expense" />}
              />
            </li>

            <li>
              <Button
                type="button"
                name="link"
                onClick={logOut}
                children={<IconFonts icon="logout" label="Log Out" />}
              />
            </li>
          </>
        ) : (
          <></>
        )}
      </nav>
      <Outlet />
    </header>
  );
};
