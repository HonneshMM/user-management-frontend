import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { FaUsers } from "react-icons/fa";

function App() {
  const [users, setUsers] = useState([]);


const activeUsers = users.filter(
  (user) => user.status === "Active"
).length;

const inactiveUsers = users.filter(
  (user) => user.status === "Inactive"
).length;

  const [showForm, setShowForm] = useState(false);
  
 const [editingUsers, setEditingUsers] = useState([]);
  
  useEffect(() => {
  fetch("http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users")
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
    })
    .catch((err) => console.error(err));
}, []);

  const addUser = async (user) => {
  try {
    await fetch("http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const response = await fetch(
      "http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users"
    );

    const data = await response.json();

    setUsers(data);
    setShowForm(false);

  } catch (error) {
    console.error(error);
  }
};

 const deleteUser = async (id) => {
  try {

    await fetch(
      `http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const response = await fetch(
      "http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users"
    );

    const data = await response.json();

    setUsers(data);

  } catch (error) {
    console.error(error);
  }
};

  const editUser = (user) => {
  const exists = editingUsers.find(
    (u) => u.id === user.id
  );

  if (!exists) {
    setEditingUsers([
      ...editingUsers,
      user
    ]);
  }
};

const cancelEdit = (id) => {
  setEditingUsers(
    editingUsers.filter(
      (user) => user.id !== id
    )
  );
};

const updateUser = async (updatedUser) => {
  try {

    await fetch(
      `http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users/${updatedUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    const response = await fetch(
      "http://user-management-alb-670460146.us-east-1.elb.amazonaws.com/users"
    );

    const data = await response.json();

    setUsers(data);

    
    
    setShowForm(false);

  } catch (error) {
    console.error(error);
  }
};
  return (
  <div className="container-xl mt-4">
  <div className="text-center mb-2">
  <h2 className="fw-bold text-primary">
  <FaUsers className="me-2" />
  Energy Meter 
  </h2>

  <h5 className="text-secondary">
    User Management Portal
  </h5>
  </div>

<div className="row mb-4">

 <div className="row justify-content-center g-2 mb-4">

  <div className="col-md-3">
    <div className="card bg-primary text-white shadow h-100 dashboard-card">
      <div className="card-body text-center py-3">
        <h5 className="mb-2">Total Users</h5>
        <h2 className="mb-0">{users.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-success text-white shadow h-100 dashboard-card">
      <div className="card-body text-center py-3">
        <h5 className="mb-2">Active Users</h5>
        <h2 className="mb-0">{activeUsers}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card bg-secondary text-white shadow h-100 dashboard-card">
      <div className="card-body text-center py-3">
        <h5 className="mb-2">Inactive Users</h5>
        <h2 className="mb-0">{inactiveUsers}</h2>
      </div>
    </div>
  </div>
  </div>


</div>

  <div className="mb-3">
  <button
    className="btn btn-primary"
    onClick={() => setShowForm(true)}
  >
    + Add User
  </button>
</div>

<div className="row justify-content-center">
  <div className="col-xl-10">
{showForm && (
  <UserForm
    addUser={addUser}
    onCancel={() => setShowForm(false)}
  />
)}
</div>
</div>
    <UserTable
  users={users}
  deleteUser={deleteUser}
  editUser={editUser}
  editingUsers={editingUsers}
  updateUser={updateUser}
  cancelEdit={cancelEdit}
/>

    
  </div>
);
}
export default App;

<div className="text-center text-muted mt-3">
  © 2026 Energy Meter- User Management Portal
</div>