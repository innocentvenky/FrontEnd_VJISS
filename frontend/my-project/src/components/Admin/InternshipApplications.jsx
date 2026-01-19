import React, { useEffect, useState } from "react";
import api from "../apis/api";
import styles from "../styles/components/AdimHomePage/InternshipApplications.module.css";

/* ================= Dummy Data ================= */
const dummyApplications = [
  {
    id: "dummy-1",
    user_name: "Rahul Sharma",
    email: "rahul@gmail.com",
    internship_title: "Frontend Developer",
    status: "PENDING",
    applied_at: "2025-01-05",
    resume: "https://example.com/resume1.pdf",
  },
  {
    id: "dummy-2",
    user_name: "Anjali Verma",
    email: "anjali@gmail.com",
    internship_title: "Backend Developer",
    status: "APPROVED",
    applied_at: "2025-01-03",
    resume: "https://example.com/resume2.pdf",
  },
  {
    id: "dummy-3",
    user_name: "Amit Kumar",
    email: "amit@gmail.com",
    internship_title: "Full Stack Intern",
    status: "REJECTED",
    applied_at: "2025-01-02",
    resume: "",
  },
];

/* ================= Component ================= */
const InternshipApplications= () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  /* ================= Fetch Applications ================= */
const fetchApplications = async () => {
  try {
    const res = await api.get("/VJISS/view_application/");
    const apiData = Array.isArray(res.data) ? res.data : [];

    const normalized = apiData.map((item) => ({
      id: item.application_id || crypto.randomUUID(),
      user_name: item.student?.username || "—",
      email: item.student?.email || "—",
      internship_title: item.internship_offers?.title || "—",
      status: item.status || "PENDING",
      applied_at: item.applied_at || item.created_at || new Date(),
      resume: item.resume || "",
    }));

    setApplications(normalized.length ? normalized : dummyApplications);
    console.log("Normalized applications:", normalized);
  } catch (error) {
    console.error("API error → loading dummy data", error);
    setApplications(dummyApplications);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchApplications();
  }, []);

  /* ================= Update Status ================= */
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/VJISS/modify_application/${id}`, { status });
    } catch (err) {
      console.error(err);
    }

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  /* ================= Filters ================= */
  const filteredApplications = applications
    .filter((app) =>
      `${app.user_name}${app.email}${app.internship_title}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(
      (app) => statusFilter === "ALL" || app.status === statusFilter
    );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Internship Applications</h2>

      <div className={styles.filters}>
        <input
          className={styles.search}
          placeholder="Search name, email, internship"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Internship</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Applied On</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.empty}>
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.user_name}</td>
                  <td>{app.email}</td>
                  <td>{app.internship_title}</td>

                  <td>
                    <span className={`${styles.status} ${styles[app.status.toLowerCase()]}`}>
                      {app.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        window.confirm("Change status?") &&
                        updateStatus(app.id, e.target.value)
                      }
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>

                  <td>{new Date(app.applied_at).toLocaleDateString()}</td>

                  <td>
                    {app.resume ? (
                      <a href={app.resume} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InternshipApplications;
