import React, { useEffect, useState, useContext } from "react";
import Navbar from "../navabar/navbar";
import api from "../apis/api";
import { AuthContext } from "../contexts/AuthContext";


import styles from "./dashboard.module.css";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
 const cards = [
    { title: "Employees", value: 128, color: "blue" },
    { title: "Projects", value: 24, color: "green" },
    { title: "Revenue", value: "₹12.5L", color: "purple" },
    { title: "Profit / Loss", value: "+₹3.2L", color: "orange" },
  ];

  const [stats, setStats] = useState({
    courses: 0,
    internships: 0,
    jobs: 0,
    trainers: 0,
  });

  const offerings = [
    {
      title: "Industry-Ready Courses",
      desc: "Professional courses designed with real-world use cases.",
    },
    {
      title: "Internship Programs",
      desc: "Hands-on experience with expert mentorship.",
    },
    {
      title: "New Batch Updates",
      desc: "Regularly starting batches with flexible schedules.",
    },
    {
      title: "Job Notifications",
      desc: "Latest openings and placement assistance.",
    },
    {
      title: "Expert Trainers",
      desc: "Learn from industry professionals with experience.",
    },
    {
      title: "About Our Company",
      desc: "Trusted training institute focused on career growth.",
    },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        

        const [
          coursesRes,
          internshipsRes,
          jobsRes,
          trainersRes,
        ] = await Promise.all([
          api.get("/VJISS/course_details/"),
          api.get("/VJISS/internship_offers_details/"),
          api.get("/VJISS/job_notification_details/"),
          api.get("/VJISS/trainer_details/"),
        ]);

        setStats({
          courses: coursesRes.data.length,
          internships: internshipsRes.data.length,
          jobs: jobsRes.data.length,
          trainers: trainersRes.data.length,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        
      }
    };

    fetchDashboard();
  }, []);



  return (
    <>
      <Navbar />
 <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome back, Admin 👋</p>
      </header>

      {/* Stats Cards */}
      <div className={styles.cardGrid}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${styles.card} ${styles[card.color]}`}
          >
            <h3>{card.title}</h3>
            <span>{card.value}</span>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Recent Employees</h2>
          <ul>
            <li>Ravi Kumar – Python Developer</li>
            <li>Anitha – Frontend Developer</li>
            <li>Vijay – DevOps Engineer</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Active Projects</h2>
          <ul>
            <li>Learning Management System</li>
            <li>Company ERP Portal</li>
            <li>AI Chatbot Integration</li>
          </ul>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Dashboard;
