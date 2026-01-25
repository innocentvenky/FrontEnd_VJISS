import React, { useState,useRef } from "react";
import axios from "axios";
import {AuthContext} from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";




const PasswordInput = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputfield}>
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














const SignIN = ({goToSignup,goToForgot}) => {


const [isRightPanelActive, setIsRightPanelActive] = useState(false);



  const [otp, setOtp] = useState("");

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





const OTP_EXPIRY_SECONDS = 5 * 60; // 5 minutes

const [otpExpired, setOtpExpired] = useState(false);
const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);
const [resendDisabled, setResendDisabled] = useState(false);

const timerRef = useRef(null);






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

  try {
    await axios.post("https://vjinnovative-company.onrender.com/VJISS/send-otp/", {
      email: formData.email,
    });

    alert("OTP sent successfully");

    setSignupOtpSent(true);
    setOtp("");
    startOtpCountdown();
  } catch (err) {
    alert("Failed to send OTP");
  }
};




// const sendForgotOtp = async () => {
//   if (!forgotValue) {
//     alert("Enter email or phone");
//     return;
//   }
//   // call forgot OTP API
//   startOtpCountdown();
// };





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




const sendOtp = async () => {
  if (!forgotValue) {
    alert("Please enter email");
    return;
  }

  setCheckingUser(true);
  try {
    await axios.post("https://vjiss-compnay.onrender.com/VJISS/send-otp/", {
      email: forgotValue,
    });

    alert("OTP sent successfully");

    setOtpSent(true);
    
    setOtp("");
    startOtpCountdown();
  } catch (err) {
    alert(err.response?.data?.error || "User not found");
  } finally {
    setCheckingUser(false);
  }
};





const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

 


 const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ================= LOGIN =================
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        "https://vjinnovative-company.onrender.com/VJISS/login/",
        {
          email: formData.email,
          password: formData.password,
        }
      );
console.log("Login response:", response.data);

console.log("Received token:", response.data.token);
      login(response.data.token, response.data.is_superuser,response.data.is_staff,response.data.public_id);
      
      alert("Login successful");
      setTimeout(() => {
        
navigate("/");

        
      }, 1000);
    } catch (err) {
      alert("Login failed: Invalid credentials");
    } finally {
      setLoader(false);
    }
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


const updatepassword = async () => {
  if (otpExpired) {
    alert("OTP expired. Please resend OTP.");
    return;
  }

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await axios.put("https://vjiss-compnay.onrender.com/VJISS/update_password/", {
      email: forgotValue,
      new_password: newPassword,
      otp: otp,
    });

    alert("Password updated successfully");

    clearInterval(timerRef.current);
    setShowForgot(false);
    setForgotValue("");
    setOtp("");
    setnewPassword("");
    setConfirmPassword("");
  } catch (err) {
    alert("Invalid OTP or error updating password");
  }
};


    // ================= SIGN UP =================



const handleSignUpSubmit = async (e) => {
  e.preventDefault();

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
      "https://vjiss-compnay.onrender.com/VJISS/create_user/",
      { ...formData, otp:otp }
    );

    alert("Registration successful!");
    clearInterval(timerRef.current);
    setIsSignUpMode(false);
  } catch(e) {
    console.error("Signup failed", e.response?.data || e.message);
  alert(e.response?.data?.error || "Signup failed. Please try again.");
  }
};



  return (
    <>



      <div className={styles.main}>
      {/* LOGIN Form */}
                <form onSubmit={handleSignInSubmit} className={styles.signform}>
                  <h1 className={styles.main_title}>VJISS </h1>
  <h2 className={styles.title}>Sign in</h2>

  
    <>
      <div className={styles.inputfield}>
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

      {/* <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div> */}


<PasswordInput
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  required
/>




      {/* 🔹 Forgot password link */}
    <p
  style={{ cursor: "pointer", color: "#5995fd", fontSize: "14px" }}
  onClick={() => {
    clearInterval(timerRef.current);
    setShowForgot(true);
    setOtp("");
    setSignupOtpSent(false);
    setOtpSent(false);
    setOtpExpired(false);
    
    goToForgot();
  }}
>
  Forgot password?
</p>


      <input
        type="submit"
        value={loader ? "..." : "Login"}
        className={styles["login-btn"]}
        disabled={loader}
      />
 <p className={styles.signupText}>
  If you don&apos;t have an account?{" "}
  <span className={styles.signupLink} onClick={goToSignup}>
    Sign Up
  </span>
</p>


    </>
  
</form>
</div>
     
    </>
  );
};

export default SignIN;



