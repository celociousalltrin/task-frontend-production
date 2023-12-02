import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { signupSchema } from "../../utils/form-validation-schema";

import "./style.css";
import AppPasswordInput from "../app-password-input";
import AppEmailVerifyInput from "../app-Email-verify-input";
import UploadProfilePicture from "../upload-profile-pic";
import { responseMessage } from "../../utils/response-message";
import { useNavigate } from "react-router-dom";
import {
  generateAdminUserOTP,
  generateUserOTP,
  verifyAdminUserOTP,
  verifyUserOTP,
} from "../../services/methods";
import { staticResponseMessage } from "../../utils/static-response-message";

const Signup = ({ activeTab, api, isUserProfile }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const init = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    ...(isUserProfile && { image_uri: "" }),
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (!isVerified) {
      return staticResponseMessage("FA005");
    }
    if (isUserProfile && !values.image_uri) {
      return staticResponseMessage("FA006");
    }
    setIsCreating(true);
    try {
      const response = await api(values);
      responseMessage(response.data.code);
      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:27 ~ handleSubmit ~ err:", err);
      responseMessage(err.data.code);
    } finally {
      isUserProfile(false);
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: signupSchema,
    onSubmit: handleSubmit,
  });

  const {
    handleBlur,
    errors,
    touched,
    dirty,
    setFieldValue,
    handleChange,
    values,
  } = formik;
  const { name, email, password, phone_number } = values;

  useEffect(() => {
    formik.resetForm();
  }, [activeTab]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="row">
          {isUserProfile && (
            <div className="col-12 d-flex justify-content-center">
              <UploadProfilePicture
                setFieldValue={setFieldValue}
                image_uri={formik.values.image_uri}
                activeTab={activeTab}
              />
            </div>
          )}
          <div className="col-md-6 mb-3">
            <Form.Label>
              Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!errors.name && dirty}
              isInvalid={!!errors.name && touched.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </div>

          <div className="col-md-6 mb-3">
            <AppEmailVerifyInput
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!errors.email && dirty}
              isInvalid={!!errors.email && touched.email}
              errors={errors}
              isVerified={isVerified}
              setIsVerified={setIsVerified}
              generateCodeApi={
                activeTab === "User" ? generateUserOTP : generateAdminUserOTP
              }
              verifyCodeAPi={
                activeTab === "User" ? verifyUserOTP : verifyAdminUserOTP
              }
            />
          </div>
          <div className="col-md-6">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <AppPasswordInput
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!errors.password && dirty}
              isInvalid={!!errors.password && touched.password}
            />
            {touched.password && errors.password && (
              <p className="text-danger mt-1">{errors.password}</p>
            )}
          </div>
          <div className="col-md-6">
            <Form.Label className="mb-2 pb-1">
              Phone Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              name="phone_number"
              value={phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!errors.phone_number && dirty}
              isInvalid={!!errors.phone_number && touched.phone_number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone_number}
            </Form.Control.Feedback>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary" type="submit">
            {isCreating ? "User Creating..." : `${activeTab} Signup`}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
