import React from "react";
import { useEffect } from "react";
import { logout } from "../../services/methods";

import { responseMessage } from "../../utils/response-message";
import { useLocation, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    userLogout();
  }, []);

  const userLogout = async () => {
    try {
      const response = await logout();

      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");

      responseMessage(
        state?.is_authenticated_error ? "ER901" : response.data.code
      );

      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:12 ~ userLogout ~ err:", err);
    }
  };
  return <div></div>;
};

export default Logout;
