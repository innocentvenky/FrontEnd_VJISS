import React, { useState, useEffect, useContext } from "react";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./BatchDetails.module.css";
import Navbar from "../navabar/navbar";

const BatchDetails = () => {
  const [batches, setBatches] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applyingId, setApplyingId] = useState(null);
  const [activeBatchId, setActiveBatchId] = useState(null);
  const [showApplied, setShowApplied] = useState(false);

  const { token, logout, public_id } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ----------------------------
     Fetch batches + enrollments
  -----------------------------*/
  useEffect(() => {
    //   // if (!token) {
    //   //   logout();
    //   //   return;
    // }

    const fetchData = async () => {
      try {
        setLoading(true);

      
          const res_1=await api.get("/VJISS/batch_details/")
          setBatches(res_1.data)

      if (token){
        const res_2=   await api.get("/VJISS/batch_enrollment_details/")

        const myEnrollments = res_2.data.filter(
          (e) => e.student.public_id === public_id
        );
        setEnrollments(myEnrollments);}
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, logout, public_id]);

  /* ----------------------------
     Helpers
  -----------------------------*/
  const isNewbatch = (startDate) => {
    if (!startDate) return false;
    const diff =
      (new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= -7 && diff <= 7;
  };

  const getEnrollmentForBatch = (batchId) => {
    return enrollments.find(
      (e) => e.batch?.batch_id === batchId
    );
  };

  /* ----------------------------
     Apply handler
  -----------------------------*/
  const handleApply = async (e, batchId) => {
    e.stopPropagation();
    setApplyingId(batchId);

    try {
      await api.post("/VJISS/batch_enrollment/", {
        student_id: public_id,
        batch_id: batchId,
      });

      // optimistic update
      setEnrollments((prev) => [
        ...prev,
        {
          batch: { batch_id: batchId },
          status: "Pending",
        },
      ]);

      alert("Applied successfully ✅");
    } catch (err) {
      alert("Already applied or enrollment closed ❌");
    } finally {
      setApplyingId(null);
    }
  };

  /* ----------------------------
     UI states
  -----------------------------*/
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <Navbar />

      {/* ---------------- My Applications ---------------- */}

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
                 
                >
                    <h3>{item.batch.course.course_name}</h3>
                  <p>
                    <strong>Level:</strong>{" "}
                    {item.batch.course.course_level}
                  </p>
                  <p>
                    <strong>Faculty:</strong>{" "}
                    {item.batch.faculty.trainer_name}
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











      {/* ---------------- Batch List ---------------- */}
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Batch Details</h1>

        <div className={styles.batchGrid}>
          {batches.map((batch) => {
            const enrollment = getEnrollmentForBatch(batch.batch_id);
            const status = enrollment?.status || "NotApplied";

            let buttonText = "ENROLL";
            let disabled = false;

            if (status === "Pending" || status === "Enrolled") {
              buttonText = "Applied ✅";
              disabled = true;
            }

            if (status === "Dropped") {
              buttonText = "ENROLL";
              disabled = false;
            }

            return (
              <div
                key={batch.batch_id}
                className={`${styles.batchCard} ${
                  activeBatchId === batch.batch_id
                    ? styles.activeCard
                    : ""
                }`}
                onClick={() => setActiveBatchId(batch.batch_id)}
              >
                {isNewbatch(batch.start_date) && (
                  <span className={styles.newBadge}>NEW</span>
                )}

                <h2 className={styles.courseName}>
                  {batch.course.course_name}
                </h2>

                <p>
                  <strong>Faculty:</strong>{" "}
                  {batch.faculty.trainer_name}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {batch.start_date || "TBD"}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {batch.end_date || "TBD"}
                </p>

                <p>
                  <strong>Timing:</strong>{" "}
                  {batch.timing
                    ? new Date(
                        `1970-01-01T${batch.timing}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "TBD"}
                </p>

                <p>
                  <strong>Mode:</strong> {batch.mode}
                </p>

                <p>
                  <strong>Batch Type:</strong> {batch.batch_type}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {batch.course_duration}
                </p>

                <span
                  className={`${styles.batchstatus} ${
                    styles[batch.status]
                  }`}
                >
                  {batch.status}
                </span>

                {/* -------- Apply Button -------- */}
                <button
                  className={`${styles["action-btn"]} ${
                    disabled ? styles.disabled : styles.enroll
                  }`}
                  disabled={disabled || applyingId === batch.batch_id}
                  onClick={(e) =>
                    handleApply(e, batch.batch_id)
                  }
                >
                  {applyingId === batch.batch_id
                    ? "APPLYING..."
                    : buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
