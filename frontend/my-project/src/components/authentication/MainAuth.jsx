import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignIN from "./signin";
import Signup from "./signup";
import styles from './mainauth.module.css'

const Auth = ({ defaultForm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeForm, setActiveForm] = useState(defaultForm || "login");

  // 🔁 Sync state when URL changes
  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveForm("login");
    } else if (location.pathname === "/signup") {
      setActiveForm("signup");
    }
  }, [location.pathname]);

  const handleShowSignup = () => {
    setActiveForm("signup");
    navigate("/signup"); // ✅ URL CHANGE
  };

  const handleShowLogin = () => {
    setActiveForm("login");
    navigate("/login"); // ✅ URL CHANGE
  };

  return (
    <><div className={styles.authWrapper}>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>

      {activeForm === "login" ? (
        <SignIN goToSignup={handleShowSignup} />
      ) : (
        <Signup onSwitchToLogin={handleShowLogin} />
      )}
      </div>
    </>
  );
};

export default Auth;
