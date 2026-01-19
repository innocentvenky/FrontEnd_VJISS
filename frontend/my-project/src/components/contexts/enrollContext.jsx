import { createContext, useContext, useEffect, useState } from "react";
import api from "../apis/api";
import { AuthContext } from "./AuthContext";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { public_id } = useContext(AuthContext);

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  /* -----------------------------
     Fetch Enrollments
  ----------------------------- */
 const fetchEnrollments = async () => {
  try {
    const { data } = await api.get(
      "/VJISS/student_enrollment_details/"
    );

    const myEnrollments = Array.isArray(data)
      ? data.filter(e => e.student.public_id === public_id)
      : [];

    setEnrollments(myEnrollments);
  } catch (err) {
    console.error("Failed to fetch enrollments", err);
  }
};

  useEffect(() => {
    if (public_id) fetchEnrollments();
  }, [public_id]);

  /* -----------------------------
     Helpers
  ----------------------------- */
  const getEnrollmentByCourse = (courseId) => {
  console.log("🔍 getEnrollmentByCourse called");
  console.log("➡️ courseId:", courseId);
  console.log("📦 enrollments array:", enrollments);

  const found = enrollments.find((e) => {
    console.log(
      "🔎 checking enrollment:",
      "enrollment_id:", e.enrollment_id,
      "| course_id:", e.course?.course_id,
      "| status:", e.status
    );

    return e.course?.course_id === courseId;
  });

  console.log("✅ matched enrollment:", found);
  return found;
};

   

  const getEnrollmentStatus = (courseId) => {
    const enrollment = getEnrollmentByCourse(courseId);
    console.log(enrollment);
    return enrollment ? enrollment.status : null;
  };

  /* -----------------------------
     Enroll Course
  ----------------------------- */
  const enrollCourse = async (courseId) => {
    try {
      setLoading(true);

      await api.post("/VJISS/student_enrollment/", {
        student_id: public_id,
        course_id: courseId,
      });

      await fetchEnrollments();
      return { success: true };
    } catch (err) {
      console.error("Enrollment failed", err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     Update Enrollment
  ----------------------------- */
  const updateEnroll = async (courseId) => {
    const enrollment = getEnrollmentByCourse(courseId);
    if (!enrollment) return { success: false };

    try {
      setLoading(true);

      await api.put(
        `/VJISS/modify_student_enrollment/${enrollment.enrollment_id}/`,
        {
          student_id: public_id,
          course_id: courseId,
        }
      );

      await fetchEnrollments();
      return { success: true };
    } catch (err) {
      console.error("Update failed", err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        enrollments,
        enrollCourse,
        updateEnroll,
        getEnrollmentStatus,
        loading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
