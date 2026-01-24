import React, { useState, useEffect, useContext } from "react";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";
import { CourseContext } from "../contexts/enrollContext";
import styles from "./BatchDetails.module.css";
import Navbar from "../navabar/navbar";
import EnrollButton from "../courses/EnrollButton";

const BatchDetails = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔵 clicked / active batch
  const [activeBatchId, setActiveBatchId] = useState(null);

  const { enrollments } = useContext(CourseContext);
  const { token, logout } = useContext(AuthContext);

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
      } catch (err) {
        console.error(err);
        setError("Failed to load batches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [token, logout]);

  const isNewbatch = (startDate) => {
    if (!startDate) return false;

    const today = new Date();
    const batchDate = new Date(startDate);
    const diffDays = (batchDate - today) / (1000 * 60 * 60 * 24);

    return diffDays >= -7 && diffDays <= 7;
  };

  if (loading) return <div className={styles.loading}>Loading batches...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (batches.length === 0)
    return <div className={styles.empty}>No batches available</div>;

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Batch Details</h1>

        <div className={styles.batchGrid}>
          {batches.map((batch) => {
            const enrolledBatch = enrollments.find(
              (e) => e.course?.course_id === batch.course.course_id
            );

            const isEnrolledThisBatch =
              enrolledBatch?.batch?.batch_id === batch.batch_id;

            const isBlocked =
              enrolledBatch &&
              enrolledBatch.batch?.batch_id !== batch.batch_id;

            return (

              <div
  key={batch.batch_id}
  className={`${styles.batchCard}
    ${isEnrolledThisBatch ? styles.enrolledCard : ""}
    ${isBlocked ? styles.blockedCard : ""}
    ${activeBatchId === batch.batch_id ? styles.activeCard : ""}
  `}
  onClick={() => setActiveBatchId(batch.batch_id)}
>
  {isNewbatch(batch.start_date) && (
    <span className={styles.newBadge}>NEW</span>
  )}

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

  {/* 🔴 Block message */}
  {isBlocked && (
    <div className={styles.blockMessage}>
      You are already enrolled in{" "}
      <strong>{batch.course.course_name}</strong> batch.
    </div>
  )}

  {isEnrolledThisBatch && (
  <div className={styles.presentText}>
    You are in this batch
  </div>
)}


  <EnrollButton
    courseId={batch.course.course_id}
    batchId={batch.batch_id}
    courseName={batch.course.course_name}
  />
</div>

            
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
