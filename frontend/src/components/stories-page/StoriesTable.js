import { Table } from "react-bootstrap";

const StoriesTable = () => {
    return (
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

            </tbody>
        </Table>
    );
}

export default StoriesTable;