import { Container } from "react-bootstrap";
import EditStoryForm from "../shared/EditStoryForm/EditStoryForm";

const EditStory = () => {
  return (
    <Container>
      <h3>Edit Story</h3>
      <hr />
      <EditStoryForm editState={true} />
    </Container>
  );
};

export default EditStory;
