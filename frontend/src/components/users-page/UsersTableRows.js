import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./UsersTableRow.module.css";

const UsersTableRows = () => {
  const [users, setUsers] = useState([]);
  let usersTable = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  users.map((user) => {
    usersTable.push(
      <tr key={user._id}>
        <td>
          <img
            className={styles.profilePicture}
            src={user.profilePictureURL}
            alt="profile pic"
          ></img>
          <Link className={styles.link} to={`/${user._id}/stories`}>
            {user.name}
          </Link>{" "}
        </td>
        <td>{user.city}</td>
        <td>{new Date().getFullYear() - user.birthyear}</td>
      </tr>
    );
    return user;
  });

  return usersTable;
};

export default UsersTableRows;
