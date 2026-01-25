import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import "./loading.css";

// const LoadingSpinner = () => {
//   const { loading } = useContext(LoadingContext);

//   return (
//     <>
//       {loading && (
//         <div className="status-container">
//           <div className="loader"></div>
//           <p>Loading company profile...</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default LoadingSpinner;


const LoadingSpinner = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
