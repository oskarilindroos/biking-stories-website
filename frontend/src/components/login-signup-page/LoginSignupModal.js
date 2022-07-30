import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { login, signup } from "../../services/user/UserService";
import UserContext from "../../contexts/UserContext";

const LoginSignupModal = ({ open, onClose }) => {
  const [user, setUser] = useState({
    // Storing the user in an object
    email: "",
    password: "",
    name: "",
    city: "",
    birthyear: 0,
    profilepic_url: "",
  });

  const [showSignUp, setShowSignUp] = useState(false); // This state controls whether or not additional sign up forms are shown
  //const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);

  const showSignUpForms = () => {
    setShowSignUp(true);
  };

  const hideSignUpForms = () => {
    setShowSignUp(false);
  };

  // Handler to set user object's properties
  const formOnChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: add input check
    if (showSignUp) {
      // Sign up
      signup(user, setError);
      hideSignUpForms();
    } else {
      // Log in
      login(user, userContext.login, setError);
      onClose(); // Close modal on succesful login
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Button
          onClick={hideSignUpForms}
          variant={showSignUp ? "outline-dark" : "dark"}
          className="px-5"
        >
          Log In
        </Button>
        <Button
          onClick={showSignUpForms}
          variant={showSignUp ? "dark" : "outline-dark"}
          className="px-5 mx-2"
        >
          Sign Up
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
              onChange={formOnChangeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={formOnChangeHandler}
            />
          </Form.Group>

          {showSignUp && (
            <>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  required
                  name="name"
                  onChange={formOnChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  required
                  name="city"
                  onChange={formOnChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Birthyear</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter birthyear"
                  required
                  name="birthyear"
                  onChange={formOnChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUrl">
                <Form.Label>Profile picture</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Image url"
                  name="profilepic_url"
                  onChange={formOnChangeHandler}
                />
              </Form.Group>
            </>
          )}
          <div className="d-grid">
            <Button variant="success" type="submit">
              {showSignUp ? "Sign Up" : "Log In"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginSignupModal;
