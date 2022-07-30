import { Container } from "react-bootstrap";
//import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import StoriesTable from "./StoriesTable";

const Stories = () => {
  //const { fullname } = useParams();
  const location = useLocation();
  const selectedUser = location.state.user; // Get selected user from the state property of the location object

  return (
    <Container>
      <h3>
        <img src={selectedUser.img} alt="profile picture"></img>
        {selectedUser.fullname}'s stories
      </h3>
      <StoriesTable user={selectedUser} />
    </Container>
  );
};

export default Stories;
