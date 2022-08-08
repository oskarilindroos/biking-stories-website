import Modal from "react-bootstrap/Modal";

const StoryModal = (props) => {
  const story = props.selectedStory;
  return (
    <Modal size="lg" show={props.open} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          On {story.date} at {story.location} in {story.city}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{story.text}</p>
        <img
          style={{ maxWidth: "90%" }}
          src={story.img}
          alt="biking related"
        ></img>
      </Modal.Body>
      <Modal.Footer>
        <p className="text-center">Story by {story.name}</p>
      </Modal.Footer>
    </Modal>
  );
};

export default StoryModal;
