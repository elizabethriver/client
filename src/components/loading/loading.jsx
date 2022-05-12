import React from "react";
import { SpinnerRoundOutlined } from "spinners-react";
import "./style/loading.css";

export const Loading = () => {
  return (
    <main>
      <div className="loading_container">
        <h1>Loading</h1>
        <SpinnerRoundOutlined color="#009c86" size='10%'/>
      </div>
    </main>
  );
};
