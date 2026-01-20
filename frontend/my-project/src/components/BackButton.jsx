import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
<button
  onClick={() => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  }}
  title="Go Back"
  style={{
    position: "fixed",
       bottom: "calc(env(safe-area-inset-bottom) + 16px)",
    bottom: "20px",
    left: "20px",
    width: "44px",
    height: "44px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 999,
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
    transition: "transform 0.2s ease, background 0.2s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.background = "#0b5ed7";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = "#0d6efd";
  }}
>
  ←
</button>

  );
};

export default BackButton;
