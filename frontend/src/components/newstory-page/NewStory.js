import { Container } from "react-bootstrap";
import EditStoryForm from "../shared/EditStoryForm/EditStoryForm";
const NewStory = () => {
  return (
    <Container>
      <h3>New story</h3>
      <hr />
      <EditStoryForm editState={false} />
    </Container>
  );
};

export default NewStory;
