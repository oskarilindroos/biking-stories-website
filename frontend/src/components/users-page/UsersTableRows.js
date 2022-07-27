import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './UsersTableRow.module.css';

const UsersTableRows = () => {

    const [users, setUsers] = useState([]);
    let usersTable = [];

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5001/users'); // TODO: Remove mock data
            setUsers(response.data);
        }

        fetchUsers();

    }, []);

    users.map((user) => {
        usersTable.push(<tr>
            <td>
                <img
                    className={styles.profilePicture}
                    src={user.img}
                    alt="profile pic">
                </img>
                <Link className={styles.link} to={`/${user.fullname}/stories`} state={{ user }}>{user.fullname}</Link>  {/*Pass the selected user as a state object which we can later get with useLocation
                        TODO: Change fullname to _uid 
                */}
            </td>
            <td>{user.city}</td>
            <td>{new Date().getFullYear() - user.birthyear}</td>

        </tr>);
        return user;
    })


    return (
        usersTable
    );
}

export default UsersTableRows;