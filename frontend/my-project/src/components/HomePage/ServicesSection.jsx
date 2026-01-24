import React from "react";
import styles from "../styles/components/ServicesSection.module.css";

const SERVICES = [
  {
    icon: "🎓",
    title: "Industry-Focused Courses",
    description:
      "Curriculum designed with industry experts to match real-world job requirements.",
  },
  {
    icon: "🛠️",
    title: "Hands-On Projects",
    description:
      "Build real applications and portfolios while learning.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Mentorship",
    description:
      "Learn directly from professionals with real industry experience.",
  },
  {
    icon: "💼",
    title: "Career Support",
    description:
      "Resume building, mock interviews, and placement guidance.",
  },
  {
    icon: "📜",
    title: "Certification",
    description:
      "Recognized certificates to boost your professional profile.",
  },

];

const ServicesSection = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Everything You Need to <span>Succeed</span>
          </h2>
          <p className={styles.subtitle}>
            We provide complete learning and career support to help
            students achieve their goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {SERVICES.map((service, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
