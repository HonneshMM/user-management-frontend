import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UserForm from "./UserForm";

function UserTable({ users, deleteUser, editUser ,editingUsers,
  updateUser,cancelEdit}) {
  return (
    <div className="card shadow p-3">
    <div className="d-flex justify-content-between align-items-center mb-4">
      
  <h2 className="text-primary mb-0">
    User List
  </h2>

  <span className="badge bg-primary fs-6">
    Total Users: {users.length}
  </span>
</div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-sm">  
        <thead
  style={{
    backgroundColor: "#0d2dfd",
    color: "white"
  }}
>
          <tr>
            <th>Sr.No</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>

                  <td>
                    {user.status === "Active" ? (
                      <span className="badge bg-success">
                        Active
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td>{user.role}</td>

                  <td>
                    <FaEdit
                      style={{
                        color: "#67d0d8b0",
                        cursor: "pointer",
                        fontSize: "20px",
                        marginRight: "15px",
                      }}
                      onClick={() => editUser(user)}
                      title="Edit User"
                    />

                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#b02634c3",
                        cursor: "pointer",
                        fontSize: "20px",
                        padding: "0",
                      }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          deleteUser(user.id);
                        }
                      }}
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                {editingUsers.some(
                      (u) => u.id === user.id
                    ) && (
                  <tr>
                    <td colSpan="8">
                      <div className="card shadow-sm p-3 bg-light">
                        <UserForm
                          selectedUser={user}
                          updateUser={updateUser}
                          onCancel={() => cancelEdit(user.id)}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
      </table>
      </div>
    </div>
  );
}

export default UserTable;