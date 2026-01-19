import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import styles from "../styles/components/AdimHomePage/AllUsers.module.css";










const AllUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await api.get("VJISS/users_details/");

      const userList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.results)
        ? res.data.results
        : [];

      setUsers(userList);
      console.log("Fetched users:", userList);
    } catch (err) {
      console.error("Failed to fetch users", err);
      
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

const filteredUsers = Array.isArray(users)
  ? users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search);

      const matchesRole = role === "All" || user.role === role;
      const matchesStatus = status === "All" || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    })
  : [];
console.log("Filtered users:", filteredUsers);
const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async (user) => {
    try {
      await api.patch(`/admin/users/${user.id}/status/`, {
        status: user.status === "Active" ? "Blocked" : "Active",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
            : u
        )
      );
    } catch (err) {
      console.error("Status update failed");
    }
  };

  if (loading) return <p className={styles.loading}>Loading users...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>All Users</h2>

      {/* ================= FILTERS ================= */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Admin">Admin</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>first Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              
              <th>Date Joined</th>
              <th>Last Login</th>
              
         
             
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.public_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                
                <td>{formatDate(user.date_joined)}</td>
                <td>{formatDate(user.last_login)}</td>
                <td className={styles.role}>{user.role}</td>

                <td>
                  <span
                    className={`${styles.status} ${
                      styles[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  {user.applications?.length > 0 ? (
                    <button
                      className={styles.viewBtn}
                      onClick={() => setSelectedUser(user)}
                    >
                      View ({user.applications.length})
                    </button>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <button
                    className={
                      user.status === "Active"
                        ? styles.blockBtn
                        : styles.unblockBtn
                    }
                    onClick={() => toggleStatus(user)}
                  >
                    {user.status === "Active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className={styles.empty}>No users found</p>
        )}
      </div>

      {/* ================= SLIDE DRAWER ================= */}
      {selectedUser && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setSelectedUser(null)}
        >
          <div
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <h3>{selectedUser.name}</h3>
              <button onClick={() => setSelectedUser(null)}>✕</button>
            </div>

            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>

            <h4>Applications</h4>

            {selectedUser.applications?.length > 0 ? (
              selectedUser.applications.map((app) => (
                <button
                  key={app.id}
                  className={styles.appItem}
                  onClick={() =>
                    navigate(
                      app.type === "internship"
                        ? `/admin/internship/${app.id}`
                        : `/admin/course/${app.id}`
                    )
                  }
                >
                  {app.type.toUpperCase()} — {app.title}
                </button>
              ))
            ) : (
              <p>No applications found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
