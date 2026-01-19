import React from "react";
import styles from "../styles/components/hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Learn <span>Industry-Ready Skills</span>
          <br />
          Build Your Career
        </h1>

        <p className={styles.heroSubtitle}>
          Live instructor-led courses with real projects, certification,
          and job-oriented training.
        </p>

        <div className={styles.heroFeatures}>
          <span>🎓 Expert Trainers</span>
          <span>💼 Job Assistance</span>
          <span>📜 Certification</span>
        </div>

        <div className={styles.heroButtons}>
          <button className={styles.primary}>Explore Courses</button>
          <button className={styles.secondary}>Free Demo Class</button>
        </div>

        <div className={styles.heroStats}>
          ⭐ 4.8/5 Rating · 👨‍🎓 10,000+ Students · 📚 50+ Courses
        </div>
      </div>
    </section>
  );
};

export default Hero;
