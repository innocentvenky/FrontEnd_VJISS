import { useState, useContext, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import feather from "feather-icons";
import { NavbarContext } from "../contexts/navbarContext";

import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { token, handleLogout, handleLogin } = useContext(NavbarContext);

  useEffect(() => {
    feather.replace();
  }, [menuOpen]);

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

 return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo} onClick={() => goTo("/")}>
          <img src={`${process.env.PUBLIC_URL}/vjiss.ico`} alt="Logo" />
           <h1 className={styles.main_title}>VJISS </h1>
           
        </div>

        {/* Desktop Menu */}
        <ul className={styles.navLinks}>
          {[
            ["/", "Home"],
            ["/courses", "Courses"],
            ["/newbacth", "New Batch"],
            ["/internship", "Internship"],
            ["/jobnotifications", "Job Notifications"],
            ["/trainers", "Trainers Info"],
            ["/about", "About"],
          ].map(([path, label]) => (
            <li
              key={path}
              className={`${styles.navItem} ${
                location.pathname === path ? styles.active : ""
              }`}
              onClick={() => goTo(path)}
            >
              {label}
            </li>
          ))}

          <li>
            <button
              className={`${styles.authBtn} ${
                !token ? styles.blink : ""
              }`}
              onClick={token ? handleLogout : handleLogin}
            >
              {token ? "Logout" : "Login"}
            </button>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i data-feather="menu"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {[
            ["/", "Home"],
            ["/courses", "Courses"],
            ["/newbacth", "New Batch"],
            ["/internship", "Internship"],
            ["/jobnotifications", "Job Notifications"],
            ["/trainers", "Trainers Info"],
            ["/about", "About"],
          ].map(([path, label]) => (
            <span
              key={path}
              className={`${styles.mobileItem} ${
                location.pathname === path ? styles.mobileActive : ""
              }`}
              onClick={() => goTo(path)}
            >
              {label}
            </span>
          ))}

          <button
            className={`${styles.authBtn} ${
              !token ? styles.blink : ""
            }`}
            onClick={token ? handleLogout : handleLogin}
          >
            {token ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
