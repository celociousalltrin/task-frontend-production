import React, { useState } from "react";

import { Form } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "./style.css";

const AppPasswordInput = (props) => {
  const [passwordDisplay, setPasswordDisplay] = useState(false);
  return (
    <div className="position-relative">
      <Form.Control
        {...props}
        type={passwordDisplay ? "text" : "password"}
        onChange={props.onChange}
        className="mt-1"
      />
      <span>
        {passwordDisplay ? (
          <AiOutlineEye
            className="password-eye__icon"
            size={22}
            color="blue"
            onClick={() => setPasswordDisplay(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="password-eye__icon"
            size={22}
            onClick={() => setPasswordDisplay(true)}
          />
        )}
      </span>
    </div>
  );
};

export default AppPasswordInput;
