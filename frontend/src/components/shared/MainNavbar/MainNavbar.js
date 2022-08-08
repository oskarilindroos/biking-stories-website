import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import styles from "./MainNavbar.module.css";

import LoginSignupModal from "../../login-signup-page/LoginSignupModal";
import { UserContext } from "../../../contexts/UserContext";

const MainNavbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, logout } = useContext(UserContext);
  return (
    <Navbar className={styles.navbar} bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Bicycle Stories</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className={styles.link} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className={styles.link} as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link className={styles.link} as={Link} to="/stories">
              Stories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          {user.isLoggedIn ? (
            <>
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline-dark" onClick={() => setOpenModal(true)}>
              Log In/Sign Up
            </Button>
          )}
        </Nav>
        <LoginSignupModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
