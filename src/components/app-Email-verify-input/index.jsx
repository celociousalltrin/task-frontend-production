import React, { useState } from "react";

import { Form } from "react-bootstrap";

import "./style.css";
import AppOTP from "../app-otp";
import { staticResponseMessage } from "../../utils/static-response-message";
import { responseMessage } from "../../utils/response-message";

const AppEmailVerifyInput = (props) => {
  const [isGenerateCode, setIsGenerateCode] = useState(false);

  const [isCodeGenrating, setIsCodeGenerating] = useState(false);
  const [otp, setOTP] = useState("");

  const handleGenerateVerifyCode = async (input) => {
    if (!input) {
      return staticResponseMessage("FA002");
    }
    setIsCodeGenerating(true);
    try {
      const response = await props.generateCodeApi({ email: input });
      responseMessage(response.data.code, 6000);
      setIsGenerateCode(true);
    } catch (err) {
      console.log(
        "🚀 ~ file: index.jsx:41 ~ handleGenerateVerifyCode ~ err:",
        err
      );
      responseMessage(err?.data?.code);
    } finally {
      setIsCodeGenerating(false);
    }
  };

  const handleVerifyOTP = async (input) => {
    try {
      const {
        data: {
          response_data: { is_otp_verified },
          code,
        },
      } = await props.verifyCodeAPi({ otp: input, email: props.value });

      if (is_otp_verified) {
        props.setIsVerified(true);
        responseMessage(code);
      }
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:66 ~ handleVerifyOTP ~ err:", err);
      responseMessage(err.data.code, 3000);
    }
  };

  return (
    <div className="position-relative">
      {!isGenerateCode || props.isVerified ? (
        <>
          <Form.Label>
            Email <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...props}
            onChange={props.onChange}
            disabled={props.isVerified}
          />

          <Form.Control.Feedback type="invalid">
            {props.errors.email}
          </Form.Control.Feedback>
          {!props.isVerified && (
            <span>
              <button
                className="generate-code-button btn btn-info  p-1"
                onClick={() => handleGenerateVerifyCode(props.value)}
                type="button"
                disabled={!!props.errors.email}
              >
                {isCodeGenrating ? "Generating..." : "Generate Code"}
              </button>
            </span>
          )}
        </>
      ) : (
        <div>
          <label>OTP *</label>
          <AppOTP
            setIsVerified={props.setIsVerified}
            setOTP={setOTP}
            otp={otp}
            handleVerifyOTP={handleVerifyOTP}
          />
        </div>
      )}
    </div>
  );
};

export default AppEmailVerifyInput;
