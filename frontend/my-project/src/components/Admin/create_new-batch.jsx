


import React, { useEffect, useState } from "react";
import api from "../apis/api";
import styles from "../styles/components/AdimHomePage/create_new_batch.module.css";

const NewBatchForm = () => {
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);

const [formData, setFormData] = useState({
  course_id: "",
  trainer_id: "",
  start_date: "",
  end_date: "",
  timing: "",
  mode: "Offline",
  quafication_requirements: "",
  course_duration: "",
  batch_type: "Weekdays",
  status: "upcoming",
});

// 1️⃣ Fetch courses & trainers (runs once)
useEffect(() => {
  const fetchData = async () => {
    try {
      const [coursesRes, trainersRes] = await Promise.all([
        api.get("/VJISS/course_details/"),
        api.get("/VJISS/trainer_details/")
      ]);

      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      setTrainers(Array.isArray(trainersRes.data) ? trainersRes.data : []);

      console.log(trainersRes.data);
      console.log(coursesRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  fetchData();
}, []);





const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    timing: formData.timing ? `${formData.timing}:00` : null,
  };

  console.log("Submitting payload:", payload);

  try {
    const response = await api.post("/VJISS/newbatch/", payload);
    console.log("Batch created:", response.data);
    alert("Batch Created Successfully 🎉");
  } catch (err) {
    console.error("Backend error:", err.response?.data);
    alert(JSON.stringify(err.response?.data, null, 2));
  }
};


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create New Batch</h2>

        {/* Course */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Course</label>
        <select
  name="course_id"
  value={formData.course_id}
  onChange={handleChange}
  required
>
  <option value="">Select Course</option>
  {courses.map(course => (
    <option key={course.course_id} value={course.course_id}>
      {course.course_name}
    </option>
  ))}
</select>
        </div>

        {/* Faculty */}
        <div className={styles.formGroup}>
  <label className={styles.label}>Faculty</label>
  <select
    name="trainer_id"                 // ✅ CORRECT
    className={styles.select}
    value={formData.trainer_id}       // ✅ CORRECT
    onChange={handleChange}
    required
  >
    <option value="">Select Trainer</option>
    {trainers.map(trainer => (
      <option
        key={trainer.trainer_id}
        value={trainer.trainer_id}     // ✅ UUID
      >
        {trainer.trainer_name}
      </option>
    ))}
  </select>
</div>


        {/* Dates */}
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Date</label>
            <input
              type="date"
              name="start_date"
              className={styles.input}
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>End Date</label>
            <input
              type="date"
              name="end_date"
              className={styles.input}
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Timing & Mode */}
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Timing</label>
            <input
              type="time"
              name="timing"
              className={styles.input}
              value={formData.timing}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mode</label>
            <select
              name="mode"
              className={styles.select}
              value={formData.mode}
              onChange={handleChange}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Qualification */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Qualification Requirements</label>
          <input
            type="text"
            name="quafication_requirements"
            className={styles.input}
            value={formData.quafication_requirements}
            onChange={handleChange}
            placeholder="e.g. Basic Python knowledge"
          />
        </div>

        {/* Duration & Batch Type */}
        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Course Duration</label>
            <input
              type="text"
              name="course_duration"
              className={styles.input}
              value={formData.course_duration}
              onChange={handleChange}
              placeholder="e.g. 3 Months"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Batch Type</label>
            <select
              name="batch_type"
              className={styles.select}
              value={formData.batch_type}
              onChange={handleChange}
            >
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select
            name="status"
            className={styles.select}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="upcoming">Upcoming</option>
            <option value="started">Started</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Create Batch
        </button>
      </form>
    </div>
  );
};

export default NewBatchForm;
