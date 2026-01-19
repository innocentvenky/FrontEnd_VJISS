// StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      textAlign: "center",
      flex: "1"
    }}>
      <h3 style={{ fontSize: "28px", fontWeight: "700" }}>{value}</h3>
      <p style={{ color: "#475569", marginTop: "4px" }}>{title}</p>
    </div>
  );
};

export default StatsCard;
