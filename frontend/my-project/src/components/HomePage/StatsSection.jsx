import React from "react";
import styles from "../styles/components/StatsSection.module.css";

const STATS = [
  { label: "Students Enrolled", value: "10,000+" },
  { label: "Courses Available", value: "50+" },
  { label: "Expert Instructors", value: "25+" },
  { label: "Job Placements", value: "500+" },
];

const StatsSection = () => {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        {STATS.map((stat, index) => (
          <div className={styles.card} key={index}>
            <h3 className={styles.value}>{stat.value}</h3>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
