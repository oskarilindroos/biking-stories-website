import { Table } from "react-bootstrap";
import { useState } from "react";
import StoryModal from "./StoryModal";

const StoriesTable = (selectedUser) => {
  const [openModal, setOpenModal] = useState(false);
  console.log(selectedUser.user);
  return (
    <>
      <Table responsive="sm" bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Place</th>
            <th>Story</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => setOpenModal(true)} style={{ cursor: "pointer" }}>
            <td>30.6.2020</td>
            <td>Tampere</td>
            <td>Really cold</td>
            <td>
              <img
                width="60px"
                src="https://aamukahvilla.fi/wp-content/uploads/2020/07/tampere_pyha_nasi_pyorareitisto_pyoramatkailu_pyorareitti_valkeakoski_lempaala_nokia_kangasala48.jpg"
              ></img>
            </td>
          </tr>
        </tbody>
      </Table>
      <StoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedUser={selectedUser.user}
      />
    </>
  );
};

export default StoriesTable;
