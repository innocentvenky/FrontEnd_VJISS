
import React, { useState } from "react";

import styles from "../styles/components/AdimHomePage/jobnotifiy.module.css";
import api from "../apis/api";

const JobNotificationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    company_logo: null,
    job_title: "",
    company_name: "",
    location: "",
    company_posted_date: "",
    posted_date: "",
    job_description: "",
    requirements: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "company_logo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== "") {
      data.append(key, formData[key]);
    }
  });
  console.log("Submitting job notification:", formData);

  try {
    const rsp = await api.post(
      "/VJISS/add_job_notification/",
      data,
    );

    console.log("Job notification created:", rsp.data);
    alert("Job notification created successfully!");

    if (onSubmit) onSubmit(rsp.data);
  } catch (error) {
    console.error("Error creating job notification:", error);
  }
};

  return (
    <form onSubmit={handleSubmit} className={styles.jobform}>
      <div>
        <label>Company Logo:</label>
        <input type="file" name="company_logo" onChange={handleChange} />
      </div>

      <div>
        <label>Job Title:</label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Company Posted Date:</label>
        <input
          type="date"
          name="company_posted_date"
          value={formData.company_posted_date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Posted Date:</label>
        <input
          type="date"
          name="posted_date"
          value={formData.posted_date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Job Description:</label>
        <textarea
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Requirements:</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Job Link:</label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default JobNotificationForm;
