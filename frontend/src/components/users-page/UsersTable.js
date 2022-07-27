import { Table } from 'react-bootstrap';
import UsersTableRows from './UsersTableRows';

const UsersTable = () => {

    return (
        <Table responsive="sm" bordered hover>
            <thead>
                <tr>
                    <th>User</th>
                    <th>City</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                <UsersTableRows />
            </tbody>
        </Table>
    );
}

export default UsersTable;