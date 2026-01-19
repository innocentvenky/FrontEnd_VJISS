// src/components/Admin/AdminNavbar.jsx
import React, { useState } from "react";
import styles from "../styles/components/AdimHomePage/Navbar.module.css";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      {/* Left */}
      <h2 className={styles.title}>Admin Panel</h2>

      {/* Center - Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search users, courses, internships..."
          className={styles.searchInput}
          required
        />
      </div>

      {/* Right */}
      <div className={styles.right}>
        <span className={styles.adminName}>Admin</span>

        <div
          className={styles.profile}
          onClick={() => setOpen(!open)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className={styles.avatar}
          />

          {open && (
            <div className={styles.dropdown}>
              <button>My Profile</button>
              <button>Settings</button>
              <button className={styles.logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
