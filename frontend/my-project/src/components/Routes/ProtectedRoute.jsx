import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  // ❌ Not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 🔁 remember page
      />
    );
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;
