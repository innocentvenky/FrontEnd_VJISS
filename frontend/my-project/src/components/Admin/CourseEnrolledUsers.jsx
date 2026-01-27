import React, { useEffect, useState } from "react";
import api from "../apis/api";
import styles from "../styles/components/AdimHomePage/CourseEnrolledUsers.module.css";

/* ================= Dummy Data ================= */
const dummyEnrollments = [
  {
    id: 1,
    user_name: "Rahul Sharma",
    email: "rahul@gmail.com",
    course_title: "Python Full Stack",
    status: "ENROLLED",
    enrolled_on: "2025-01-02",
  },
  {
    id: 2,
    user_name: "Anjali Verma",
    email: "anjali@gmail.com",
    course_title: "React Development",
    status: "COMPLETED",
    enrolled_on: "2024-12-20",
  },
  {
    id: 3,
    user_name: "Amit Kumar",
    email: "amit@gmail.com",
    course_title: "Django REST Framework",
    status: "ENROLLED",
    enrolled_on: "2025-01-05",
  },
  {
    id: 4,
    user_name: "Sneha Patel",
    email: "sneha@gmail.com",
    course_title: "UI/UX Design",
    status: "DROPPED",
    enrolled_on: "2024-12-15",
  },
  {
    id: 5,
    user_name: "Kiran Reddy",
    email: "kiran@gmail.com",
    course_title: "Data Science",
    status: "ENROLLED",
    enrolled_on: "2025-01-08",
  },
];

/* ================= CSV Export ================= */
const downloadCSV = (data) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const rows = [
    headers.join(","),
    ...data.map(row =>
      headers.map(h => `"${row[h] || ""}"`).join(",")
    )
  ];

  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "course_enrolled_users.csv";
  link.click();
};

const CourseEnrolledUsers = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);


  const fetchEnrollments = async () => {
    try {
      const res = await api.get("VJISS/student_enrollment_details/");
      setEnrollments(res.data?.length ? res.data : dummyEnrollments);
      console.log(res)
    } catch {
      setEnrollments(dummyEnrollments);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete enrollment?")) return;  
      await api.delete(`/VJISS/delete_student_enrollment/${id}`);
      setEnrollments((prev) => prev.filter((enroll) => enroll.enrollment_id !== id));
    } catch (err) {
      console.error("Failed to delete enrollment", err);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);


  const updateStatus = async (id, status) => {
    console.log(id,status);
    try {
      const r=await api.patch(`/VJISS/modify_student_enrollment/${id}`, { status });
    

    setEnrollments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status } : item
      )
      

    );
  fetchEnrollments()}
    catch(e){
      console.error(e)
    }
    
  };

  const filteredUsers = enrollments
    .filter(e =>
      `${e.user_name}${e.email}${e.course_title}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(e =>
      statusFilter === "ALL" || e.status === statusFilter
    );

    

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Course Enrolled Users</h2>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          className={styles.search}
          placeholder="Search user, email, course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Pending">Pending</option>
          <option value="Dropped">Dropped</option>
        </select>

        <button
          className={styles.export}
          onClick={() =>
            downloadCSV(filteredUsers.map(u => ({
              Name: u.user_name,
              Email: u.email,
              Course: u.course_title,
              Status: u.status,
              EnrolledOn: u.enrolled_on,
            })))
          }
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
                <th>Courses Level</th>
                <th>Change Status</th>
                
                <th>Enrolled On</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.empty}>
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user,index) => (
                  <tr key={index}>
                    <td>{user.student.first_name} {user.student.last_name}</td>
                    <td>{user.student.email}</td>
                    <td>{user.course.course_name}</td>
                    <td>{user.course.course_level}   </td>

                    <td>
                      <span className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className={styles.statusSelect}
                        value={user.status}
                        onChange={(e) => {
                          if (window.confirm("Change enrollment status?")) {
                            updateStatus(user.enrollment_id, e.target.value);
                          }
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Enrolled">Enrolled</option>
                        
                        <option value="Dropped">Dropped</option>
                      </select>
                    </td>

                    <td>{new Date(user.enrollment_date).toLocaleDateString()}</td>
                    <td><button onClick={() => handleDelete(user.enrollment_id)}>Delete</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseEnrolledUsers;
