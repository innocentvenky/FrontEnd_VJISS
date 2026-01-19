import React from "react";
import styles from "../styles/components/AboutSection.module.css";

const AboutSection = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <span className={styles.badge}>About Us</span>

          <h2 className={styles.title}>
            Empowering Students with <span>Industry-Ready Skills</span>
          </h2>

          <p className={styles.description}>
            We are a modern training platform focused on delivering
            high-quality, job-oriented courses. Our programs are designed
            by industry experts and built around real-world projects.
          </p>

          <ul className={styles.points}>
            <li>🎓 Expert instructors with real industry experience</li>
            <li>🛠️ Hands-on projects & live classes</li>
            <li>📜 Certification & career guidance</li>
            <li>💼 Placement & interview preparation support</li>
          </ul>

          <button className={styles.cta}>Learn More</button>
        </div>

        {/* Right Visual */}
        <div className={styles.imageWrapper}>
       <div className={styles.imagePlaceholder}>
  <img
    src="/images/learning-illustration.svg"
    alt="Learning Illustration"
    className={styles.image}
  />
</div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
