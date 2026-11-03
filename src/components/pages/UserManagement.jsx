import { useState, useEffect } from "react";

const UserManagement =() =>{
  const [users, setUsers] = useState([]);

  // 🗑️ HANDLE DELETE
  const handleDelete = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });

    if (response.ok) {
      // Filter out the deleted user from the local state
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // 📝 HANDLE EDIT
  const handleEdit = async (userId, updatedData) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const updatedUser = await response.json();

      // Map through users and replace the old user object with the updated one
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    }
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.name} - {user.phone}
          </p>
          <button onClick={() => handleEdit(user.id, { name: "New Name" })}>
            Edit
          </button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserManagement;