import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";
import { CourseContext } from "../contexts/enrollContext";
import styles from "./getcourse.module.css";
import Navbar from "../navabar/navbar";
import EnrollButton from "./EnrollButton";

const GetCourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
    const { enrollments } = useContext(CourseContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const { token, logout, public_id } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();






  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!token) {
        logout();
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data } = await api.get(
          `/VJISS/course_particular_details/${id}`
        );

        setCourseDetails(data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        } else {
          setError("Failed to load course details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, token, logout, navigate]);


  const handleEnroll = useCallback(
    async (courseId) => {
      try {
        await api.post("/VJISS/student_enrollment/", {
          student_id: public_id,
          course_id: courseId,
        });

        alert("Application sent 🎯");
      } catch (err) {
        alert("Enrollment failed");
      }
    },
    [public_id]
  );



  if (loading) return <div>Loading course details...</div>;
  if (error) return <div>{error}</div>;
  if (!courseDetails) return <div>No course details available.</div>;

  return (
    <div>
      <Navbar/>
   
    <div className={styles.container}>
      {/* Course Header */}
      <div className={styles.header}>
        <img
          src={courseDetails.course_logo}
          alt={courseDetails.course_name}
          className={styles.logo}
        />

        <div className={styles.headerInfo}>
          <h1>{courseDetails.course_name}</h1>
          <p className={styles.description}>
            {courseDetails.course_description}
          </p>

          <div className={styles.meta}>
            <span>⏱ {courseDetails.course_duration} Months</span>
            <span>🎓 {courseDetails.course_level}</span>
            <span>💰 ₹{courseDetails.course_fee}</span>
          </div>
        </div>
      </div>



      {/* Syllabus */}
      <div className={styles.syllabusSection}>
        <h2>Syllabus</h2>

        <div className={styles.syllabusList}>
          {courseDetails.syllabus_courses?.map((item, index) => (
            <div key={item.syllabus_id} className={styles.syllabusCard}>
              <div className={styles.moduleHeader}>
                <h4>Module {index + 1}</h4>
                <h3>{item.module}</h3>
              </div>

              <p>{item.description}</p>
              <span className={styles.level}>{item.level}</span>
            </div>
          ))}
        </div>


       
      </div>
      <EnrollButton courseId={courseDetails.course_id} /> 
    </div>
     </div>
  );
};
export default GetCourseDetails