import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/authNoLogged.css";

export const AuthNoLogged = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  });

  return (
    <main>
      <div className="container_NotLogged">
        <h1>You are not logged</h1>
        <iframe
          src="https://giphy.com/embed/EoH4Wpu8suiNTLpI6j"
          width="480"
          height="360"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
          title="notAuth"
        ></iframe>
      </div>
    </main>
  );
};
