import React from "react";
import styles from "../styles/components/InstructorsSection.module.css";

const INSTRUCTORS = [
  {
    name: "John Doe",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "React & Frontend Expert",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Lee",
    role: "Python & Django Specialist",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Emily Clark",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
];

const InstructorsSection = () => {
  return (
    <section className={styles.instructors}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Experts</span>
          <h2 className={styles.title}>
            Learn from <span>Industry Professionals</span>
          </h2>
          <p className={styles.subtitle}>
            Our instructors are experienced professionals ready to guide you
            through hands-on projects and real-world applications.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className={styles.grid}>
          {INSTRUCTORS.map((instructor, index) => (
            <div className={styles.card} key={index}>
              <img
                src={instructor.image}
                alt={instructor.name}
                className={styles.avatar}
              />
              <h3 className={styles.name}>{instructor.name}</h3>
              <p className={styles.role}>{instructor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
