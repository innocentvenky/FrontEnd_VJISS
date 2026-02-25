import React from "react";
import styles from "./services.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../navabar/navbar";
const Services = () => {
  const navigate = useNavigate();
  return (
    <>
        <Navbar />
      <section className={styles.hero}>
        <h1>Our Professional Manpower & Recruitment Services</h1>
        <p>
          End-to-End IT & Non-IT Staffing, RPO, and Payroll Solutions
        </p>
      </section>

      <section className={styles.section} id="it-staffing">
        <h2>IT Staffing & Recruitment Services</h2>
        <div className={styles.cards}>
          <div className={styles.card}><h3>Permanent IT Staffing</h3></div>
          <div className={styles.card}><h3>Contract / Project-Based Hiring</h3></div>
          <div className={styles.card}><h3>Remote Developers Hiring</h3></div>
          <div className={styles.card}><h3>Bulk IT Hiring</h3></div>
          <div className={styles.card}><h3>Startup Hiring Support</h3></div>
        </div>

     
      </section>

      <section className={styles.section} id="non-it">
        <h2>Non-IT Manpower Services</h2>
        <div className={styles.cards}>
          <div className={styles.card}><h3>Office Staff Recruitment</h3></div>
          <div className={styles.card}><h3>HR & Admin Hiring</h3></div>
          <div className={styles.card}><h3>Field Executives</h3></div>
          <div className={styles.card}><h3>Telecallers</h3></div>
          <div className={styles.card}><h3>Operations Staff</h3></div>
          <div className={styles.card}><h3>Manufacturing & Logistics Staff</h3></div>
          <div className={styles.card}><h3>Retail & Sales Executives</h3></div>
        </div>
      </section>

      <section className={styles.section} id="rpo">
        <h2>Recruitment Process Outsourcing (RPO)</h2>
        <div className={styles.cards}>
          <div className={styles.card}><h3>End-to-End Recruitment</h3></div>
          <div className={styles.card}><h3>Candidate Screening</h3></div>
          <div className={styles.card}><h3>Interview Coordination</h3></div>
          <div className={styles.card}><h3>Background Verification</h3></div>
          <div className={styles.card}><h3>Offer & Onboarding Support</h3></div>
        </div>
      </section>

      <section className={styles.section} id="payroll">
        <h2>Payroll & HR Compliance Services</h2>
        <div className={styles.cards}>
          <div className={styles.card}><h3>Salary Processing</h3></div>
          <div className={styles.card}><h3>PF / ESI Management</h3></div>
          <div className={styles.card}><h3>Compliance Handling</h3></div>
          <div className={styles.card}><h3>Attendance Management</h3></div>
          <div className={styles.card}><h3>Employee Documentation</h3></div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Looking for Skilled Manpower?</h2>
        <button onClick={() => navigate("/about")}>Request Consultation</button>
      </section>
    </>
  );
};

export default Services;