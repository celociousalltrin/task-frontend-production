import React from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaHome } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user_data"));
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
            <Nav.Link onClick={() => navigate("/logout")}>Logout</Nav.Link>
          </Nav>
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
                  <FaHome /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/home")}>
                  <FaHome /> User-list
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/home")}>
                  <FaHome /> Notification
                </NavDropdown.Item>
              </>
            )}

            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => navigate("/logout")}>
              <FaSignOutAlt /> Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
