import React from "react";

import "./style.css";

import Profile from "../profile";
import { verifyAdminUser, verifyUser } from "../../services/methods";

const HomePage = () => {
  const { is_admin } = JSON.parse(localStorage.getItem("user_data")) || {};

  return (
    <div>
      <Profile api={is_admin ? verifyAdminUser : verifyUser} />
    </div>
  );
};

export default HomePage;
