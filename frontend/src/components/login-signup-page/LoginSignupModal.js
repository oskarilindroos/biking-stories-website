import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

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
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useContext(UserContext);
  // console.log(userContext);

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
      try {
        const response = await axios.post("/users/signup", user);
        console.log(response);

        hideSignUpForms();
      } catch (error) {
        console.log(error);
        setErrorMsg(error.response.data.message);
      }
    } else {
      // Log in
      try {
        const response = await axios.post("/users/login", user);
        console.log(response);
        login(response.data._id, response.data.token);
        onClose();
      } catch (error) {
        console.log(error);
        setErrorMsg(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    // Empty error message when user is editing input fields
    setErrorMsg("");
  }, [user, showSignUp]);

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
        <br />
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
          {errorMsg ? <p className="text-danger">{errorMsg}</p> : ""}
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
