import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";

import "./style.css";
import { connectSocket } from "../../services/socket-utils";
import { getNotificationCount } from "../../services/socket-methods";

const Header = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const [notificationCount, setNotificationCount] = useState(0);

  const handleUpdateNotificationCount = (data) => {
    setNotificationCount(data);
    localStorage.setItem("count", data);
  };

  const connect = async () => {
    try {
      await connectSocket();
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:25 ~ connect ~ err:", err);
    }
  };
  useEffect(() => {
    if (userData?.is_admin) {
      getNotificationCount(
        "admin_notification_count",
        handleUpdateNotificationCount
      );
      connect();
    }
  }, []);
  return (
    <div>
      {" "}
      <Navbar bg="primary" data-bs-theme="light">
        <Container>
          <Nav>
            <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            {userData?.is_admin && (
              <>
                <Nav.Link onClick={() => navigate("/profile")}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/user-list")}>
                  User List
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/notification")}>
                  Notification
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {userData?.is_admin && (
              <Nav.Link onClick={() => navigate("/notification")}>
                <div className="notify-container">
                  <MdNotifications size={30} />
                  {!(localStorage.getItem("count") == 0) && (
                    <span className="notify-count">
                      {notificationCount
                        ? notificationCount
                        : localStorage.getItem("count")}
                    </span>
                  )}
                </div>
              </Nav.Link>
            )}

            <NavDropdown
              title={`Hi ${userData?.name}`}
              className="ms-2 rounded border border-dark p-2"
            >
              <NavDropdown.Item onClick={() => navigate("/home")}>
                <FaHome /> Home
              </NavDropdown.Item>
              {userData?.is_admin && (
                <>
                  <NavDropdown.Item onClick={() => navigate("/home")}>
                    <FaUser /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/home")}>
                    <FaUsers /> User-list
                  </NavDropdown.Item>
                </>
              )}

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("/logout")}>
                <FaSignOutAlt /> Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
