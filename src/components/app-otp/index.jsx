import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./style.css";
import AppToolTip from "../app-tooltip";
import { staticResponseMessage } from "../../utils/static-response-message";

const AppOTP = ({ setOTP, otp, handleVerifyOTP }) => {
  const [view, setView] = useState(false);

  return (
    <div className="otp-input">
      <OtpInput
        value={otp}
        onChange={setOTP}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputType={view ? "text" : "password"}
      />
      <div className="ms-2">
        {view ? (
          <AppToolTip title="show">
            <AiFillEye
              size={25}
              onClick={() => setView(false)}
              className="cursor-pointer"
            />
          </AppToolTip>
        ) : (
          <AppToolTip title="hide">
            <AiFillEyeInvisible
              size={25}
              onClick={() => setView(true)}
              className="cursor-pointer"
            />
          </AppToolTip>
        )}
      </div>
      <div>
        <button
          className="btn btn-primary btn-sm ms-4"
          onClick={() => {
            if (otp.length === 4) {
              handleVerifyOTP(otp);
            } else {
              staticResponseMessage(otp.length >= 1 ? "FA003" : "FA004");
            }
          }}
          type="button"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default AppOTP;
