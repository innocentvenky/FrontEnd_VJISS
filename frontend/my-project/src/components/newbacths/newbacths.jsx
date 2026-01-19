import React, { useState, useEffect, useContext ,useCallback} from "react";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./BatchDetails.module.css";
import Navbar from "../navabar/navbar";
import EnrollButton from "../courses/EnrollButton";



const STORAGE_KEY = "courseStatus";

const STATUS = {
  ENROLLED: "enrolled",
};

const BatchDetails = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [enrollments, setEnrollments] = useState([]);
    const [showApplied, setShowApplied] = useState(false);
  

  const { token, logout,public_id } = useContext(AuthContext);

 const [courseStatus, setCourseStatus] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  });

    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courseStatus));
    }, [courseStatus]);

  useEffect(() => {

    const fetchBatches = async () => {
      if (!token) {
        logout();
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get("/VJISS/batch_details/");
        setBatches(data);
        console.log("Indrasena",data)
      } catch (err) {
        console.error(err);
        setError("Failed to load batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [token, logout]);
  


  const handleEnroll = useCallback(
    async (courseId) => {
      try {
        await api.post("/VJISS/student_enrollment/", {
          student_id: public_id,
          course_id: courseId,
        });

        // Update UI immediately
        setCourseStatus((prev) => ({
          ...prev,
          [courseId]: STATUS.ENROLLED,
        }));

        alert("Application sent 🎯");
      } catch (err) {
        alert("Enrollment failed");
      }
    },
    [public_id]
  );



  if (loading) return <div className={styles.loading}>Loading batches...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (batches.length === 0) return <div className={styles.empty}>No batches available</div>;

  return (
    <div>
         <Navbar/>
    
    <div className={styles.container}>
       
      <h1 className={styles.pageTitle}>Batch Details</h1>

      <div className={styles.batchGrid}>
  {batches.map((batch) => {
    const status = courseStatus[batch.course.course_id];

    return (
      <div key={batch.batch_id} className={styles.batchCard}>
        <h2 className={styles.courseName}>
          {batch.course.course_name}
        </h2>

        <p><strong>Faculty:</strong> {batch.faculty.trainer_name}</p>

        <p><strong>Start:</strong> {batch.start_date || "TBD"}</p>
        <p><strong>End:</strong> {batch.end_date || "TBD"}</p>

        <p>
          <strong>Timing:</strong>{" "}
          {batch.timing
            ? new Date(`1970-01-01T${batch.timing}`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "TBD"}
        </p>

        <p><strong>Mode:</strong> {batch.mode}</p>
        <p><strong>Batch Type:</strong> {batch.batch_type}</p>
        <p><strong>Duration:</strong> {batch.course_duration}</p>

        <span className={`${styles.status} ${styles[batch.status]}`}>
          {batch.status}
        </span>

        <EnrollButton courseId={batch.course.course_id} />
      </div>
    );
  })}
</div>

    </div>
    </div>
  );
};

export default BatchDetails;
