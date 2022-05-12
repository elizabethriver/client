import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthNoLogged = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 5000);
    });
  
    return (
        <div>
          <p>You are not logged</p>
        </div>
      );

};
