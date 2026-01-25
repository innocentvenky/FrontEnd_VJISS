
import api from '../apis/api';
import styles from "../styles/components/InstructorsSection.module.css";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

const InstructorsSection = () => {
  const [INSTRUCTORS, setINSTRUCTORS] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchInstructors = async () => {
      try { 
        const response = await api.get('/VJISS/trainer_details/');
        setINSTRUCTORS(response.data);
        console.log("Instructors Data:", response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } 
    };

    fetchInstructors();
  }, []);

  return (
    <section className={styles.instructors}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
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
            <div className={styles.card} key={index} onClick={() => navigate("/trainers")} >
              <img
                src={instructor.trainer_image.startsWith("http")
                  ? instructor.trainer_image
                  : `${imageBaseUrl}${instructor.trainer_image}`}
                alt={instructor.name}
                className={styles.avatar}
              />
              <h3 className={styles.name}>{instructor.trainer_name}</h3>
              
              <p className={styles.role}>{instructor.trainer_title}</p>
            <p className={styles.bio}>{instructor.trainer_bio.length>50  ? instructor.trainer_bio.substring(0, 50) + "..." : instructor.trainer_bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
