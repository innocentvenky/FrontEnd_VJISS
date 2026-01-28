import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/hero.module.css";

const Hero = () => {
  const navigate=useNavigate()
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.main_title}>
          VJ Innovative Software Solutions Pvt Ltd
          <br />
          Build Your Career With Us
        </h1>

        <p className={styles.heroSubtitle}>
  Join thousands of learners at VJ Innovative Software Solutions to master Python, Full-Stack, AI & Cybersecurity.
        </p>

       

        <div className={styles.heroButtons}>
          <button  onClick={()=>navigate("/courses")} className={styles.primary}>Explore Courses</button>
          <button  onClick={()=>navigate("/about")} className={styles.secondary}>Contact Us</button>
        </div>


      </div>
    </section>
  );
};

export default Hero;
