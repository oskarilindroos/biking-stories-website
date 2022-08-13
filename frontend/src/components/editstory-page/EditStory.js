import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import EditStoryForm from "../shared/EditStoryForm/EditStoryForm";
const EditStory = () => {
  const location = useLocation();
  const story = location.state.story;

  return (
    <Container>
      <h3>Edit Story</h3>
      <hr />
      <EditStoryForm isEditState={true} story={story} />
    </Container>
  );
};

export default EditStory;
