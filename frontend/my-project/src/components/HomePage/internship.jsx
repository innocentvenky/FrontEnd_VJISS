import React from 'react';
import styles from "../styles/components/InternshipSection.module.css";

const InternshipSection = () => {
  return (
    <section className={styles.internships}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>💼 Internship Opportunities</span>
          <h2 className={styles.title}>
            Gain <span>Real-World Experience</span> Through Internships
          </h2>
          <p className={styles.subtitle}>
            Apply your skills in live projects with top companies. Boost your resume and career.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>🏢</div>
            <h3 className={styles.cardTitle}>Tech Internships</h3>
            <p className={styles.cardDescription}>
              Work on web, mobile, and AI projects in a collaborative environment.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>🎨</div>
            <h3 className={styles.cardTitle}>Design Internships</h3>
            <p className={styles.cardDescription}>
              Gain hands-on experience in UI/UX, branding, and product design.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>📊</div>
            <h3 className={styles.cardTitle}>Business & Analytics</h3>
            <p className={styles.cardDescription}>
              Work on market research, data analysis, and strategy projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
