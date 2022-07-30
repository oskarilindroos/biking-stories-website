import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const StoryModal = (props) => {
  console.log(props.selectedUser);
  return (
    <Modal show={props.open} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Date</Modal.Title>
      </Modal.Header>
      <Modal.Body>Story text</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default StoryModal;
