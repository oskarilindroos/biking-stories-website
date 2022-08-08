import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { addPointerEvent } from "framer-motion";

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
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
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
    setErrors(validate(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showSignUp) {
      // Sign up
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axios.post("/users/signup", user);
          console.log(response);

          hideSignUpForms();
        } catch (error) {
          console.log(error);
          setApiError(error.message);
        }
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
        if (error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError(error.message);
        }
      }
    }
  };

  const validate = () => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(user.email)) {
      errors.email = "Email is not valid!";
    }
    if (!user.password) {
      errors.password = "Password is required!";
    } else if (user.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    if (!user.name) {
      errors.name = "Name is required!";
    }
    if (!user.city) {
      errors.city = "City is required!";
    }
    if (!user.birthyear) {
      errors.birthyear = "Birthyear is required!";
    }
    return errors;
  };

  useEffect(() => {
    setApiError("");
    console.log(user);
  }, [user]);

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
            {showSignUp ? <p className="text-danger">{errors.email}</p> : ""}
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
            {showSignUp ? <p className="text-danger">{errors.password}</p> : ""}
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
                <p className="text-danger">{errors.name}</p>
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
                <p className="text-danger">{errors.city}</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Birthyear*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter birthyear"
                  required
                  name="birthyear"
                  onChange={formOnChangeHandler}
                />
                <p className="text-danger">{errors.birthyear}</p>
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
          {apiError ? <p className="text-danger">{apiError}</p> : ""}
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
