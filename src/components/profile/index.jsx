import React, { useEffect } from "react";
import avatar from "../../assets/avatar/avatar-icon.png";

import "./style.css";
import { responseMessage } from "../../utils/response-message";

const Profile = ({ api }) => {
  const { email, name, user_image, phone_number, is_admin } =
    JSON.parse(localStorage.getItem("user_data")) || {};
  const verifyLoginUser = async () => {
    try {
      await api();
    } catch (err) {
      responseMessage(err.data.code);
    }
  };
  useEffect(() => {
    if (!!api) {
      verifyLoginUser();
    }
  }, []);
  return (
    <div>
      <h3 className="text-center mb-4">User Profile</h3>
      {!is_admin && (
        <div className="text-center">
          <img src={user_image} alt="user-image" className="profile_img" />
        </div>
      )}
      <div className="d-flex mt-5">
        <span className="text-muted fs-6 me-2">Name:</span>
        <h5>{name}</h5>
      </div>
      <div className="d-flex mt-5">
        <span className="text-muted fs-6 me-2">Email:</span>
        <h5>{email}</h5>
      </div>
      <div className="d-flex mt-5">
        <span className="text-muted fs-6 me-2">Ph no:</span>
        <h5>{phone_number}</h5>
      </div>
    </div>
  );
};

export default Profile;
