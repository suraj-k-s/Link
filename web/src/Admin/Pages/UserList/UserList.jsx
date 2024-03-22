import React, { useEffect, useState } from "react";
import { auth } from "../../../config/Firebase";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch list of authenticated users
    const fetchUsers = async () => {
      try {
        const userList = [];
        const userRecords = await auth.getUsers();
        userRecords.forEach((user) => {
          userList.push(user.toJSON());
        });
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (uid) => {
    try {
      await auth.deleteUser(uid);
      // Remove the deleted user from the local state
      setUsers(users.filter((user) => user.uid !== uid));
      console.log(`User with UID ${uid} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting user with UID ${uid}:`, error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.uid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
