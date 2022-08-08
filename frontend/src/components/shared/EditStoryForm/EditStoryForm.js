import { Button, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";

const EditStoryForm = (props) => {
  const { user } = useContext(UserContext);

  const [editState, setEditState] = useState(props.editState);

  const [story, setStory] = useState({
    date: "",
    text: "",
    city: "",
    location: "",
    img: "",
  });

  const formOnChangeHandler = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
    // console.log(story);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editState) {
      editStory();
    } else {
      createStory();
      e.target.reset(); // Clear input fields
    }
  };

  const createStory = async () => {
    try {
      console.log(typeof story.date);
      const response = await axios.post("/stories", story, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Story created succesfully");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editStory = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          onChange={formOnChangeHandler}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Story</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Story text"
          name="text"
          onChange={formOnChangeHandler}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="In which city did the story happen?"
          name="city"
          onChange={formOnChangeHandler}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Where in the city?"
          name="location"
          onChange={formOnChangeHandler}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Image url related to the story"
          name="img"
          onChange={formOnChangeHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default EditStoryForm;
