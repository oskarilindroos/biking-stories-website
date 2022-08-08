import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import StoryModal from "./StoryModal";

const Stories = () => {
  const params = useParams();
  const uid = params.uid; // Get the uid from the url params

  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`stories/user/${uid}`);
        setStories(response.data.stories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, [uid]);
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
        <td>{(story.date = new Date(story.date).toLocaleDateString())}</td>
        <td>{story.location}</td>
        <td>{story.text}</td>
        <td>
          <img style={{ width: 100 }} src={story.img} alt="biking story"></img>
        </td>
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

export default Stories;
