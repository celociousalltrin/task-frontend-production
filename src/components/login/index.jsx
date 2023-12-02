import React from "react";
import { loginSchema } from "../../utils/form-validation-schema";

import "./style.css";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import AppPasswordInput from "../../components/app-password-input";
import { json, useNavigate } from "react-router-dom";
import { responseMessage } from "../../utils/response-message";

const Login = ({ api, activeTab }) => {
  const navigate = useNavigate();
  const init = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await api(values);
      console.log(
        "🚀 ~ file: index.jsx:21 ~ handleSubmit ~ response:",
        response
      );
      localStorage.setItem(
        "access_token",
        response.data.response_data.access_token
      );
      const jsonString = JSON.stringify(response.data.response_data);
      localStorage.setItem("user_data", jsonString);

      navigate("/home");
      responseMessage(response.data.code);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:21 ~ handleSubmit ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="login-input-container mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger mt-1">{formik.errors.email}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Password</Form.Label>
            <AppPasswordInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger mt-1">{formik.errors.password}</p>
            )}
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary mb-3"
            type="submit"
          >{`${activeTab} login`}</button>
        </div>
        <div className="d-flex justify-content-end">
          <p className="text-muted">
            Haven't sign up yet?{" "}
            <span
              className="fw-bold text-primary cursor-pointer"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
