import { Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const EditStoryForm = (props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Used to navigate back to stories page after submitting form
  const [isEditState, setEditState] = useState(props.isEditState);

  // If the user is editing the story, set the initial story state from the props, otherwise set it as empty
  const [story, setStory] = useState(
    isEditState
      ? props.story
      : {
          date: "",
          text: "",
          city: "",
          location: "",
          img: "",
        }
  );

  const formOnChangeHandler = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditState) {
      editStory();
    } else {
      createStory();
    }
  };

  const createStory = async () => {
    try {
      const response = await axios.post("/stories", story, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Story created succesfully");
      navigate("/stories");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const editStory = async () => {
    try {
      const response = await axios.patch(`/stories/${props.story._id}`, story, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Story edited succesfully");
      navigate("/stories");
    } catch (error) {
      alert(error.message);
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
          defaultValue={isEditState ? props.story.date : ""}
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
          defaultValue={isEditState ? props.story.text : ""}
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
          defaultValue={isEditState ? props.story.city : ""}
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
          defaultValue={isEditState ? props.story.location : ""}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Image url related to the story"
          name="img"
          onChange={formOnChangeHandler}
          defaultValue={isEditState ? props.story.img : ""}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isEditState ? "Save" : "Post"}
      </Button>
    </Form>
  );
};

export default EditStoryForm;
