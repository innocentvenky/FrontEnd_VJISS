import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./jobNotifications.css";
import api from "../apis/api";
import Navbar from "../navabar/navbar";
import { useNavigate } from "react-router-dom";
const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
const JobNotifications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState("")
const{token,logout}=useContext(AuthContext)
const navigate=useNavigate()
useEffect(() => {

  

  const fetchJobs = async () => {
   
    //  if (!token) {
    //     logout();
    //     navigate("/login");
    //     return;
    //   }
    try {
      const res = await api.get("/VJISS/job_notification_details/");
      // setJobs(Array.isArray(res.data) ? res.data : []);
console.log("job notifications",res.data)
    //sort data based data wise
    const sorted_data=res.data.sort((a,b)=>{
      return new Date(b.company_posted_date)-new Date(a.company_posted_date)
    })
    console.log("sorted data",sorted_data)
    setJobs(sorted_data)
      setError("")


    } catch (err) {
     
      if (err.response?.status === 401) {
       
          logout();
          navigate("/login");
        } else {
          setError("Failed to load courses. Please try again later.");
        }
      

    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, [token,logout,navigate]);


  // ✅ NEW badge logic (20 days)
  const isNewJob = (postedDate) => {
    if (!postedDate) return false;

    const today = new Date();
    const postDate = new Date(postedDate);

    const diffTime = today - postDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 7;
  };

  if (loading) return <p className="loading">Loading job notifications...</p>;

  return (
    <>
    <Navbar/>
    <section className="jobs-section">
      <h2 className="jobs-title">
        Job Notifications
        <span className="jobs-underline"></span>
      </h2>

      <div className="jobs-grid">
        {jobs.length!==0 ? jobs.map((job) => (
          <div className="job-card" key={job.notification_id}>
            {isNewJob(job.company_posted_date) && (
              <span className="new-badge">NEW</span>
            )}

            <div className="job-header">
              <img
                src={imageBaseUrl + job.company_logo}
                alt={job.company_name}
                className="company-logo"
              />
              <div>
                <h3 className="job-title">{job.job_title}</h3>
                <p className="company-name">{job.company_name}</p>
              </div>
            </div>

            <div className="job-meta">
              <span>📍 {job.location}</span>
       <span>
 {
  new Date(job.company_posted_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

</span>

            </div>



<div className="job-details">
  {job.requirements && (
    <p className="job-exp">
      🎯 <strong>Experience:</strong> {job.requirements} Years
    </p>
  )}
</div>





            <p className="job-desc">
              {job.job_description?.slice(0, 120)}…
            </p>

            <a
              href={job.link}
              target="_blank"
              rel="noreferrer"
              className="apply-link"
            >
              View & Apply →
            </a>
          </div>
        )):<h4> Currently No Open Positions</h4>}
      </div>
    </section>
 </>
  );
};

export default JobNotifications;