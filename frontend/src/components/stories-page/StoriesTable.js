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
  const [fetchStories, setFetchStories] = useState(false);
  const { user } = useContext(UserContext);
  let userStories = [];

  const deleteStory = async (storyid) => {
    try {
      const response = await axios.delete(`/stories/${storyid}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Updates the table after removing an item (used as dependancy in useEffect fetching)
      setFetchStories(!fetchStories);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${props.endpoint}`);
        setStories(response.data.stories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, [props.endpoint, fetchStories]);

  stories.map((story) => {
    userStories.push(
      <tr key={story._id}>
        <td>
          {(story.date = new Date(story.date).toISOString().substring(0, 10))}
        </td>
        <td>
          {story.location}, {story.city}
        </td>
        <td>{story.text.split(".")[0]}...</td>
        <td>{story.name}</td>
        <td>
          <img style={{ width: 100 }} src={story.img}></img>
        </td>
        <td>
          <Button
            className="mb-2"
            onClick={() => {
              setOpenModal(true);
              setSelectedStory(story);
            }}
          >
            View
          </Button>
          <br />
          {user._id === story.uid && (
            <>
              <Link to={`/stories/${story._id}`} state={{ story }}>
                <Button className="mb-2">Edit</Button>
              </Link>
              <br />
              <Button onClick={() => deleteStory(story._id)} variant="danger">
                Delete
              </Button>
            </>
          )}
        </td>
      </tr>
    );
    return story;
  });
  return (
    <Container>
      <Table responsive="sm">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "20%" }}>Location</th>
            <th style={{ width: "35%" }}>Story</th>
            <th>Creator</th>
            <th style={{ width: "10%" }}>Image</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {userStories.length !== 0 ? userStories : <h3>No stories found</h3>}
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
