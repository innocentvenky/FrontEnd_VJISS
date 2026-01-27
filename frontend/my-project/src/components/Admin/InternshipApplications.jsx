import React, { useEffect, useState } from "react";
import api from "../apis/api";
import styles from "../styles/components/AdimHomePage/InternshipApplications.module.css";

const InternshipApplications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  /* ================= Fetch Applications ================= */
  const fetchApplications = async () => {
    try {
      const res = await api.get("/VJISS/view_applications/");
      console.log("API response:", res.data);
      const apiData = Array.isArray(res.data) ? res.data : [];

      const normalized = apiData.map((item) => ({
        id: item.application_id,
        user_name: item.student?.first_name || "—",
        last_name: item.student?.last_name || "",
        email: item.student?.email || "—",
        internship_title:
          item.internship_offers?.internship_name || "—",
        status: item.status || "Pending",
        applied_at: item.applied_on || item.created_at,
        resume: item.resume || "",
      }));

      setApplications(normalized);
      console.log("Fetched applications:", normalized);
    } catch (error) {
      console.error("Failed to load applications", error);
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
      console.log("Updating status", id, status);
      await api.patch(`/VJISS/modify_application/${id}`, { status });

      setApplications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );  

    } catch (err) {
      console.error("Backend error:", err.response?.data);
      alert("Status update failed");
    }
  };



  const deleteApplication = async (id) => {
    try {
      if (!window.confirm("Delete application?")) return;
      await api.delete(`/VJISS/delete_application/${id}`);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data);

      alert("Failed to delete application");
    }
  }

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

  /* ================= Resume ================= */
  const openFile = (url) => {
    if (!url) {
      alert("Resume not available");
      return;
    }
    window.open(url, "_blank");
  };

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
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
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
              <th>Delete</th>
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
                  <td>
                    {app.user_name} {app.last_name}
                  </td>
                  <td>{app.email}</td>
                  <td>{app.internship_title}</td>

                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[app.status.toLowerCase()]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={app.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        if (!window.confirm("Change status?")) return;
                        updateStatus(app.id, newStatus);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td>
                    {new Date(app.applied_at).toLocaleDateString()}
                  </td>

                  <td>
                    <button onClick={() => openFile(app.resume)}>
                      View Resume
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {deleteApplication(app.id)}}
                    >
                      Delete
                    </button>
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
