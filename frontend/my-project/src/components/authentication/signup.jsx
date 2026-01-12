
import React, { useState,useRef } from "react";
import axios from "axios";
import {AuthContext} from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './signup.css';



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
    await axios.post("http://127.0.0.1:8000/VJISS/send-otp/", {
      email: formData.email,
    });

    alert("OTP sent successfully");

   
    setIsOtpSent(true)
    setOtp("");
    startOtpCountdown();
  } catch (err) {
    alert("Failed to send OTP");
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
      "http://127.0.0.1:8000/VJISS/create_user/",
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
    <div className="signup-container">
      <form className="signup-form" onSubmit={ handleSignUpSubmit}>
        <h2 className="VJISS">VJISS</h2>
        <h2 className="title">Sign Up</h2>

        {/* Name Fields */}
        <div className="name-fields">
          <div className="input-wrapper">
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
          <div className="input-wrapper">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name

              }
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="input-wrapper">
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
         {errors.email && <p className="error-text">{errors.email}</p>}

        {/* OTP Field */}
        <div className="otp-field input-wrapper">
            <i className="fas fa-shield-alt"></i>
  <input
    type="text"
    name="otp"
    placeholder="Enter OTP"
    maxLength={6}
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    disabled={!signupOtpSent}
  />

  <button
    type="button"
    className="otp-btn"
    onClick={sendSignupOtp}
    disabled={signupOtpSent && !otpExpired}
  >
    {/* Button text logic */}
    {!signupOtpSent && "Send OTP"}
    {signupOtpSent && !otpExpired && formatTime(timeLeft)}
    {signupOtpSent && otpExpired && "Resend OTP"}
  </button>
</div>












        {/* Phone Number */}
        <div className="input-wrapper">
          <i className="fas fa-phone"></i>
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div> {errors.phone_number && (
  <p className="error-text">{errors.phone_number}</p>
)}


        {/* Gender */}
        <div className="gender-container">
          {["Male", "Female", "Other"].map((genderOption) => (
            <label key={genderOption}>
              <input
                type="radio"
                name="gender"
                value={genderOption}
                checked={formData.gender === genderOption}
                onChange={handleChange}
              />
              <span>{genderOption}</span>
            </label>
          ))}
        </div>

        {/* Date of Birth */}
        <div className="input-wrapper">
          <i className="fas fa-calendar-alt"></i>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>{errors.password && <p className="error-text">{errors.password}</p>}

        {/* Submit */}
        <input
          type="submit"
          className="submit-btn"
          value={isSubmitting ? "Creating..." : "Sign Up"}
          disabled={isSubmitting}
        />

        {/* Back to Login */}
         <p className={"loginText"}>
  If you already have an account ?  {" "}
  <span className={"loginLink"} onClick={onSwitchToLogin}>
    Log In
  </span>
</p>
      </form>
    </div>
  );
};

export default Signup;
