
import styles from "../styles/components/InternshipSection.module.css";
import api from '../apis/api';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";


const InternshipSection = () => {
  const [internships, setInterships] = useState([]);
const navigate=useNavigate()
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await api.get('/VJISS/internship_offers_details/');
        setInterships(response.data);
        
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  return (
    <section className={styles.internships}>
      <div className={styles.container}>
        <div className={styles.header}>
         
          <h2 className={styles.title}>
            Gain <span>Real-World Experience</span> Through Internships
          </h2>
          <p className={styles.subtitle}>
            Apply your skills in live projects with top companies. Boost your resume and career.
          </p>
        </div>


     <div className={styles.grid}>
 


        {internships.map((internship) => (
          <div key={internship.id}  onClick={()=>navigate("/internship")} className={styles.card}>
            <div className={styles.icon}>
    <FaLaptopCode />
  </div>
            <h3 className={styles.cardTitle}>{internship.internship_name}</h3>
            <p className={styles.cardDescription}>
              {internship.internship_description.length > 100
                ? internship.internship_description.slice(0, 100) + "..."
                : internship.internship_description}
            </p>
          </div>
        ))}
        </div>

 
</div>

    
    </section>
  );
};

export default InternshipSection;
