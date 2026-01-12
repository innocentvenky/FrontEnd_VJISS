import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignIN from "./signin";
import Signup from "./signup";
import Forgotpassword from "./forgotpassword";
import styles from "./mainauth.module.css";

const Auth = ({ defaultForm }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeForm, setActiveForm] = useState(defaultForm || "login");

  // 🔁 Sync UI with URL
  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveForm("login");
    } else if (location.pathname === "/signup") {
      setActiveForm("signup");
    } else if (location.pathname === "/forgotpassword") {
      setActiveForm("forgot");
    }
  }, [location.pathname]);

  const showSignup = () => {
    setActiveForm("signup");
    navigate("/signup");
  };

  const showLogin = () => {
    setActiveForm("login");
    navigate("/login");
  };

  const showForgot = () => {
    setActiveForm("forgot");
    navigate("/forgotpassword");
  };

  return (
    <div className={styles.authWrapper}>
      {/* 🌊 Background Waves */}
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>

      {/* 🧩 Forms */}
      {activeForm === "login" && (
        <SignIN goToSignup={showSignup} goToForgot={showForgot} />
      )}

      {activeForm === "signup" && (
        <Signup onSwitchToLogin={showLogin} />
      )}

      {activeForm === "forgot" && (
        <Forgotpassword goToLogin={showLogin} />
      )}
    </div>
  );
};

export default Auth;
