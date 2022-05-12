import React from "react";
import { Button } from "../../components/buttons/button";
import { LinkStandard } from "../../components/link/Link";
import './style/notfound.css'

export const NotFound = () => {
  return (
    <main className="container-NotFound">
      <h1>NotFound</h1>
      <iframe
        src="https://giphy.com/embed/14uQ3cOFteDaU"
        width="480"
        height="360"
        frameBorder="0"
        className="giphy-embed"
        title="404"
        allowFullScreen
      ></iframe>
      <Button
        name="update_product"
        type="button"
        children={<LinkStandard to="/dashboard" children="Go home" />}
      />
    </main>
  );
};
