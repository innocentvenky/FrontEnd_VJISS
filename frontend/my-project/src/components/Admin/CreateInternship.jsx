import React, { useState } from "react";
import api from "../apis/api";
import styles from "../styles/components/AdimHomePage/CreateInternship.module.css";

const CreateInternship = () => {
  const [formData, setFormData] = useState({
    internship_name: "",
    internship_description: "",
    technologies: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/VJISS/create_internship/", formData);
      setMessage("✅ Internship created successfully");
      setFormData({
        internship_name: "",
        internship_description: "",
        technologies: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create internship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Create Internship</h2>

        {/* Internship Name */}
        <div className={styles.field}>
          <label>Internship Name</label>
          <input
            type="text"
            name="internship_name"
            placeholder="e.g. Frontend Developer Intern"
            value={formData.internship_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className={styles.field}>
          <label>Description</label>
          <textarea
            name="internship_description"
            placeholder="Enter internship description"
            value={formData.internship_description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Technologies */}
        <div className={styles.field}>
          <label>Technologies</label>
          <input
            type="text"
            name="technologies"
            placeholder="React, Django, PostgreSQL"
            value={formData.technologies}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Internship"}
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default CreateInternship;
