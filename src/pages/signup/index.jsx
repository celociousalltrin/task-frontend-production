import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Signup from "../../components/signup";
import { authenticateButtonName } from "../../utils/common-function";

import "./style.css";
import { createAdminUser, createUser } from "../../services/methods";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("user-signup");
  const navigate = useNavigate();
  return (
    <div className="signup-container">
      <div className="center-signup-content">
        <button
          className="btn btn-sm btn-dark mb-3"
          type="button"
          onClick={() => navigate("/login")}
        >
          Back to Login Page
        </button>
        <Tabs
          defaultActiveKey="user-signup"
          justify="true"
          variant="underline"
          className="login-tab-container mb-4"
          onSelect={(tab) => setActiveTab(tab)}
        >
          <Tab eventKey="user-signup" title="User Signup">
            <Signup
              activeTab={authenticateButtonName(activeTab)}
              api={createUser}
              isUserProfile
            />
          </Tab>
          <Tab eventKey="admin-signup" title="Admin Signup">
            <Signup
              activeTab={authenticateButtonName(activeTab)}
              api={createAdminUser}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SignupPage;
