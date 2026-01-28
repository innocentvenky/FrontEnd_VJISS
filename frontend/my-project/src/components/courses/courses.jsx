import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";
import { CourseContext } from "../contexts/enrollContext";
import Navbar from "../navabar/navbar";
import EnrollButton from "./EnrollButton";
import styles from "./courses.module.css";

const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplied, setShowApplied] = useState(false);

  const { token, logout } = useContext(AuthContext);
  const { enrollments } = useContext(CourseContext);
 

  const navigate = useNavigate();

  /* --------------------------------
     Fetch Courses
  -------------------------------- */
  useEffect(() => {
    // if (!token) {
    //   logout();
    //   navigate("/login");
    //   return;
    // }

    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/VJISS/course_details/");
        setCourses(Array.isArray(data) ? data : []);
        
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <Navbar />

      {/* -------------------------------
         My Applications
      -------------------------------- */}
     {token && <div className={styles.appliedSection}>
        
        <div
          className={styles.appliedHeader}
          onClick={() => setShowApplied(!showApplied)}
        >
          <h2>My Applications</h2>
          <span>{showApplied ? "▲" : "▼"}</span>
        </div>

        {showApplied && (
          <div className={styles.appliedList}>
            {enrollments.length === 0 ? (
              <p>No applications found</p>
            ) : (
              enrollments.map((item) => (
                <div
                  key={item.enrollment_id}
                  className={styles.appliedCard} 
                  onClick={() => navigate(`/course/${item.course.course_id}`)}
                >
                  <h3>{item.course.course_name}</h3>
                  <p>
                    <strong>Level:</strong>{" "}
                    {item.course.course_level}
                  </p>
                  <p>
                    <strong>Applied On:</strong>{" "}
                    {item.enrollment_date}
                  </p>
                  <span
                    className={`${styles.status} ${
                      styles[item.status.toLowerCase()]
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>}

      {/* -------------------------------
         Courses List
      -------------------------------- */}
      <section className={styles["courses-section"]}>
        <div className={styles["courses-grid"]}>
          {courses.map((course) => (
            <div
              key={course.course_id}
              className={styles["course-card"]}
            >
              <img
                src={imageBaseUrl + course.course_logo}
                alt={course.course_name}
                className={styles["course-logo"]}
              />

              <h3>{course.course_name}</h3>
              <p>{course.course_description.length > 100
                  ? course.course_description.slice(0, 100) + "..."
                  : course.course_description }

              </p>


              <div className={styles["course-actions"]}>
                <EnrollButton courseId={course.course_id} />

                <button
                  className={`${styles["action-btn"]} ${styles.details}`}
                  onClick={() =>
                    alert("Please login to view details")
                  }
                >
                  DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Courses;
