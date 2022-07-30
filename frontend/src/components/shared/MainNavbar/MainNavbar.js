import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import styles from "./MainNavbar.module.css";

import LoginSignupModal from "../../login-signup-page/LoginSignupModal";
import UserContext from "../../../contexts/UserContext";

const MainNavbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const userContext = useContext(UserContext);

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
            {localStorage.getItem("token") ? (
              <>
                <Nav.Link className={styles.link} as={Link} to="/stories/new">
                  New Story
                </Nav.Link>
                <Nav.Link className={styles.link} as={Link} to="/stories/new">
                  Edit Story
                </Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto">
          {localStorage.getItem("token") ? (
            <Button variant="danger" onClick={userContext.logout}>
              Logout
            </Button>
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
