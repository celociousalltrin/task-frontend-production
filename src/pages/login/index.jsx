import React, { useEffect, useState } from "react";
import Login from "../../components/login";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./style.css";
import { authenticateButtonName } from "../../utils/common-function";
import { loginAdminUser, userLogin } from "../../services/methods";
import { staticResponseMessage } from "../../utils/static-response-message";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("user-login");

  useEffect(() => {
    toast(
      "I deployed the backend under a trial render account, hence the backend deployed in render does not always run because of the free render account. Please refresh the page.",
      { duration: 15000 }
    );
  }, []);

  return (
    <div className="login-container">
      <div className="center-login-content">
        <h4 className="fs-2 text-center mb-3">Welcome Back!</h4>

        <Tabs
          defaultActiveKey="user-login"
          justify="true"
          variant="underline"
          className="login-tab-container mb-4"
          onSelect={(tab) => setActiveTab(tab)}
        >
          <Tab eventKey="user-login" title="User Login">
            <Login
              activeTab={authenticateButtonName(activeTab)}
              api={userLogin}
            />
          </Tab>
          <Tab eventKey="admin-login" title="Admin Login">
            <Login
              activeTab={authenticateButtonName(activeTab)}
              api={loginAdminUser}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
