import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./forgot.module.css";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <i className={`fas fa-lock ${styles.leftIcon}`}></i>

      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <i
        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles.rightIcon}`}
        onClick={() => setShowPassword(!showPassword)}
      ></i>
    </div>
  );
};

const ForgotPassword = ({ goToLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const timerRef = useRef(null);

  const startOtpCountdown = () => {
    clearInterval(timerRef.current);
    setOtpExpired(false);
    setTimeLeft(300);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setOtpExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const sendOtp = async () => {
    if (!email) return alert("Enter email");
    setOtpSent(true);
    try {
      await axios.post("http://127.0.0.1:8000/VJISS/send-otp/", { email });
      setOtp("");
      startOtpCountdown();
      alert("OTP sent");
    } catch {
      alert("Error sending OTP");
    }
  };

  const updatePassword = async () => {
    if (otpExpired) return alert("OTP expired");
    if (newPassword.length < 6) return alert("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");

    try {
      await axios.put("http://127.0.0.1:8000/VJISS/update_password/", {
        email,
        otp,
        new_password: newPassword,
      });

      alert("Password updated");
      clearInterval(timerRef.current);
      goToLogin();
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.card}>

        <h2 className={styles.title}>Reset Password</h2>

        <div className={styles.inputWrapper}>
          <i className={`fas fa-envelope ${styles.leftIcon}`}></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.otpWrapper}>
            <i className={`fas fa-shield-alt ${styles.leftIcon}`}></i>
          <input

            type="text"
            placeholder="OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!otpSent}
          />
          <button onClick={sendOtp} disabled={otpSent && !otpExpired} >
            {!otpSent && "Send OTP"}
            {otpSent && !otpExpired && formatTime(timeLeft)}
            {otpSent && otpExpired && "Resend"}
          </button>
        </div>

        <PasswordInput
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className={styles.submitBtn} onClick={updatePassword}>
          Update Password
        </button>

        <p className={styles.backText} onClick={goToLogin}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
