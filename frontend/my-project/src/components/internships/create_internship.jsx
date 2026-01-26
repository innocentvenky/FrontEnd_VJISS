import React, { useState } from "react";
import styles from "./create_internship.module.css";
import api from "../apis/api";










const CreateInternship = () => {
  const [formData, setFormData] = useState({
    internship_name: "",
    internship_description: "",
    technologies: "",
  });

 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post(
        "VJISS/add_internship_offers/",
        formData
      );

      alert("Internship created successfully 🎉");

      // reset form
      setFormData({
        internship_name: "",
        internship_description: "",
        technologies: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create internship ❌");
    }
  };




  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Internship</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Internship Name</label>
          <input
            type="text"
            name="internship_name"
            value={formData.internship_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <textarea
            name="internship_description"
            value={formData.internship_description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Technologies (comma separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Django, PostgreSQL"
            required
          />
        </div>




        <button type="submit" className={styles.submitBtn}>
          Create Internship
        </button>
      </form>
    </div>
  );
};

export default CreateInternship;
