import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/components/Navbar.module.css";


const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];









const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🎓 EduTech</div>

      <div className={styles.rightSection}>
        <ul className={styles.navLinks}>
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}   // 🔥 important
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.login}>Login</button>
          <button className={styles.signup}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
