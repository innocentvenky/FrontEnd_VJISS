import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, is_superuser } = useContext(AuthContext);

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but NOT admin
  if (!is_superuser) {
    return <Navigate to="/403" replace />;
  }

  // ✅ Admin
  return children;
};

export default AdminRoute;
