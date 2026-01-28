import React, { useContext, useState } from "react";
import { CourseContext } from "../contexts/enrollContext";
import styles from "./courses.module.css";
import { AuthContext } from "../contexts/AuthContext";  
const EnrollButton = ({ courseId }) => {
  const { enrollCourse, getEnrollmentStatus } =
    useContext(CourseContext);
    const{token}=useContext(AuthContext)

  const [loading, setLoading] = useState(false);

  const status = getEnrollmentStatus(courseId);

  // 🎯 Button config based on backend status
  let text = "ENROLL";
  let disabled = false;

  if (status === "Pending") {
    text = "ENROLLED";
    disabled = true;
  } else if (status === "Enrolled") {
    text = "ENROLLED";
    disabled = true;
  } else if (status === "Dropped") {
    text = "ENROLL";
    disabled = false;
  }

  const handleEnroll = async () => {
    if (disabled || loading) return;
    if (!token) {
      alert("Please log in to enroll in a course.");
      return;
      
    }
if(token){
    try {
      setLoading(true);
      const res = await enrollCourse(courseId);

      if (!res.success) {
        alert("Enrollment failed");
        return;
      }

      alert("Application sent 🎯");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }}
  };

  return (
    <button
      className={`${styles["action-btn"]} ${styles.enroll} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled || loading}
      onClick={handleEnroll}
    >
      {loading ? "APPLYING..." : text}
    </button>
  );
};

export default EnrollButton;
