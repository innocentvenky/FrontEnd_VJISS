
import React, { useState,useRef } from "react";
import axios from "axios";
import {AuthContext} from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";



const PasswordInput = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <i className="fas fa-lock"></i>

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />

      <i
        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
        onClick={() => setShowPassword(!showPassword)}
        id={styles.eyeicon}
      ></i>
    </div>
  );
};








const Signup = ({ onSwitchToLogin }) => {


const [otp, setOtp] = useState("");

  // error feilds
  const [errors, setErrors] = useState({});


  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [loader, setLoader] = useState(false);
const [showForgot, setShowForgot] = useState(false);
const [forgotValue, setForgotValue] = useState("");
const[newPassword,setnewPassword]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")
const {login,logout} = React.useContext(AuthContext);

const [otpSent, setOtpSent] = useState(false);
const [checkingUser, setCheckingUser] = useState(false);

const [signupOtpSent, setSignupOtpSent] = useState(false);

const[showotpbtn,setshowotpbtn]=useState(true)



const OTP_EXPIRY_SECONDS = 4.5 * 60; // 5 minutes

const [otpExpired, setOtpExpired] = useState(false);
const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);
const [resendDisabled, setResendDisabled] = useState(false);

const timerRef = useRef(null);




  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Backend-aligned state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "Male",
    date_of_birth: "",
    password: "",
  });

const sendSignupOtp = async () => {
    
  if (!formData.email) {
    alert("Please enter email");
    return;
  }
 setSignupOtpSent(true);
  try {
    await axios.post("https://vjinnovative-company.onrender.com/VJISS/send-otp/", {
      email: formData.email,
    });

    alert("OTP sent successfully");

   
    setIsOtpSent(true)
    setOtp("");
    startOtpCountdown();
  } catch (err) {
    alert("Failed to send OTP");
    setSignupOtpSent(false);
    console.error("Error sending OTP", err);
  }
};


const startOtpCountdown = () => {
  clearInterval(timerRef.current);

  setOtpExpired(false);
  setTimeLeft(OTP_EXPIRY_SECONDS);
  setResendDisabled(true);

  timerRef.current = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timerRef.current);
        setOtpExpired(true);
        setResendDisabled(false);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};





 const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const goBackToLogin = () => {
  clearInterval(timerRef.current);
  setShowForgot(false);
  setOtpSent(false);
  setOtp("");
  setOtpExpired(false);
  setTimeLeft(OTP_EXPIRY_SECONDS);
  setResendDisabled(false);
};

  const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};







    const validateForm = () => {
  let newErrors = {};

  // Email validation
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Enter a valid email address";
  }

  // Phone validation
  if (!formData.phone_number) {
    newErrors.phone_number = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.phone_number)) {
    newErrors.phone_number = "Enter a valid 10-digit phone number";
  }

  // Password validation
   

  // Password validation
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(
      formData.password
    )
  ) {
    newErrors.password =
      "Password must contain uppercase, lowercase, number, special character and be at least 8 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;

 
};







const handleSignUpSubmit = async (e) => {
  e.preventDefault();
    if (!validateForm()) {
    return;
  }

  if (!signupOtpSent) {
    alert("Please send OTP first");
    return;
  }

  if (!otp) {
    alert("Please enter OTP");
    return;
  }

  if (otpExpired) {
    alert("OTP expired. Please resend OTP");
    return;
  }

  try {
    await axios.post(
      "https://vjinnovative-company.onrender.com/VJISS/create_user/",
      { ...formData, otp:otp }
    );

    alert("Registration successful!");
    clearInterval(timerRef.current);
    setIsSignUpMode(false);
    navigate("/login")
  } catch(e) {
    console.error("Signup failed", e.response?.data || e.message);
  alert(e.response?.data?.error || "Signup failed. Please try again.");
  }
};


  
  return (
  <div className={styles.signupContainer}>
    <form className={styles.signupForm} onSubmit={handleSignUpSubmit}>
      <h2 className={styles.brand}>VJISS</h2>
      <h2 className={styles.title}>Sign Up</h2>

      {/* Name Fields */}
      <div className={styles.nameFields}>
        <div className={styles.inputWrapper}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputWrapper}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className={styles.inputWrapper}>
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {errors.email && <p className={styles.errorText}>{errors.email}</p>}

      {/* OTP */}
      <div className={`${styles.inputWrapper} ${styles.otpField}`}>
        <i className="fas fa-shield-alt"></i>
        <input
          type="text"
          placeholder="Enter OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!signupOtpSent}
        />

        <button
          type="button"
          className={styles.otpBtn}
          onClick={sendSignupOtp}
          disabled={signupOtpSent && !otpExpired}
        >
          {!signupOtpSent && "Send OTP"}
          {signupOtpSent && !otpExpired && formatTime(timeLeft)}
          {signupOtpSent && otpExpired && "Resend OTP"}
        </button>
      </div>

      {/* Phone */}
      <div className={styles.inputWrapper}>
        <i className="fas fa-phone"></i>
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </div>
      {errors.phone_number && (
        <p className={styles.errorText}>{errors.phone_number}</p>
      )}

      {/* Gender */}
      <div className={styles.genderContainer}>
        {["Male", "Female", "Other"].map((g) => (
          <label key={g} className={styles.genderLabel}>
            <input
              type="radio"
              name="gender"
              value={g}
              checked={formData.gender === g}
              onChange={handleChange}
            />
            <span>{g}</span>
          </label>
        ))}
      </div>

      {/* DOB */}
      <div className={styles.inputWrapper}>
        <i className="fas fa-calendar-alt"></i>
        <input
        placeholder="Date Of Birth"
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <PasswordInput
        name="password"
        placeholder="Create Password"
        value={formData.password}
        onChange={handleChange} 
        required
      />





      {errors.password && (
        <p className={styles.errorText}>{errors.password}</p>
      )}

      {/* Submit */}
      <input
        type="submit"
        className={styles.submitBtn}
        value={isSubmitting ? "Creating..." : "Sign Up"}
        disabled={isSubmitting}
      />

      {/* Login link */}
      <p className={styles.loginText}>
        If you already have an account?{" "}
        <span className={styles.loginLink} onClick={onSwitchToLogin}>
          Log In
        </span>
      </p>
    </form>
  </div>


  );
};

export default Signup;
