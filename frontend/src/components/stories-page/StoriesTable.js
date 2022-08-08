import { Button, Container } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import StoryModal from "./StoryModal";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const StoriesTable = (props) => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${props.endpoint}`);
        setStories(response.data.stories);
        console.log(response.data.stories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, [props.endpoint]);
  let userStories = [];

  stories.map((story) => {
    userStories.push(
      <tr
        onClick={() => {
          setOpenModal(true);
          setSelectedStory(story);
        }}
        key={story._id}
        style={{ cursor: "pointer" }}
      >
        <td>
          {(story.date = new Date(story.date).toLocaleDateString("en-us"))}
        </td>
        <td>{story.location}</td>
        <td>{story.text}</td>
        <td>{story.name}</td>
        <td>
          <img style={{ width: 100 }} src={story.img} alt="biking story"></img>
        </td>
        {user._id === story.uid && (
          <td>
            <Link to={`/stories/${story._id}`}>
              <Button className="mb-2">Edit</Button>
            </Link>
            <br />
            <Button variant="danger">Delete</Button>
          </td>
        )}
      </tr>
    );
    return story;
  });
  return (
    <Container>
      <Table responsive="sm" bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Story</th>
            <th>Creator</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {userStories.length !== 0 ? (
            userStories
          ) : (
            <h3>User has no stories</h3>
          )}
        </tbody>
      </Table>
      <StoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedStory={selectedStory}
      />
    </Container>
  );
};

export default StoriesTable;
