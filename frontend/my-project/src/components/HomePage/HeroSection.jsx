import React from "react";
import styles from "../styles/components/hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          VJ <span>Innovative Software Solutions Pvt Ltd</span>
          <br />
          Build Your Career With Us
        </h1>

        <p className={styles.heroSubtitle}>
  Join thousands of learners at VJ Innovative Software Solutions to master Python, Full-Stack, AI & Cybersecurity.
        </p>

       

        <div className={styles.heroButtons}>
          <button className={styles.primary}>Explore Courses</button>
          <button className={styles.secondary}>Contact Us</button>
        </div>


      </div>
    </section>
  );
};

export default Hero;
