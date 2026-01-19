import React from "react";
import styles from "../styles/components/CTASection.module.css";

const CTASection = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ready to <span>Transform Your Career?</span>
        </h2>
        <p className={styles.subtitle}>
          Join thousands of students who learned industry-ready skills with
          our expert-led courses.
        </p>
        <div className={styles.buttons}>
          <button className={styles.primary}>Enroll Now</button>
          <button className={styles.secondary}>Free Demo Class</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
