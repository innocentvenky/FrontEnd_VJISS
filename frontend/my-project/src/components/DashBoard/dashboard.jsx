import React, { useEffect, useState, useContext } from "react";
import Navbar from "../navabar/navbar";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";
import "./dashboard.css";
import { FiBookOpen, FiBriefcase, FiUsers, FiCalendar } from "react-icons/fi";

const Dashboard = () => {
  const { token, public_id } = useContext(AuthContext);
  const [stats, setStats] = useState({
    courses: 0,
    internships: 0,
    jobs: 0,
    trainers: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const coursesRes = await api.get("/VJISS/course_details/");
        const internshipsRes = await api.get("/VJISS/internship_offers_details/");
        const jobsRes = await api.get("/VJISS/job_notification_details/");
        const trainersRes = await api.get("/VJISS/trainer_details/");

        setStats({
          courses: coursesRes.data.length,
          internships: internshipsRes.data.length,
          jobs: jobsRes.data.length,
          trainers: trainersRes.data.length,
        });

        setRecentCourses(
          coursesRes.data.slice(-4).reverse()
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="dashboard-loading">Loading dashboard...</p>;

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {/* ================= WELCOME ================= */}
        <header className="dashboard-header">
          <h1>Welcome Back!</h1>
          <p>Explore your courses, internships, and more.</p>
        </header>

        {/* ================= QUICK STATS ================= */}
        <section className="stats-grid">
          <div className="stat-card courses">
            <FiBookOpen className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.courses}</h3>
              <p>Courses</p>
            </div>
          </div>

          <div className="stat-card internships">
            <FiBriefcase className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.internships}</h3>
              <p>Internships</p>
            </div>
          </div>

          <div className="stat-card jobs">
            <FiCalendar className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.jobs}</h3>
              <p>Job Notifications</p>
            </div>
          </div>

          <div className="stat-card trainers">
            <FiUsers className="stat-icon" />
            <div className="stat-info">
              <h3>{stats.trainers}</h3>
              <p>Trainers</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
