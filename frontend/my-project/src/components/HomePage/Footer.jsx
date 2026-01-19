import React from "react";
import styles from "../styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo & About */}
        <div className={styles.section}>
          <div className={styles.logo}>🎓 EduTech</div>
          <p className={styles.description}>
            Empowering students with industry-ready skills through expert-led
            courses, hands-on projects, and career support.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.links}>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/instructors">Instructors</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Contact Us</h4>
          <p>Email: support@edutech.com</p>
          <p>Phone: +91 12345 67890</p>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">🔗</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} EduTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
