import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import "./loading.css";

const LoadingSpinner = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <>
      {loading && (
        <div className="status-container">
          <div className="loader"></div>
          <p>Loading company profile...</p>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
