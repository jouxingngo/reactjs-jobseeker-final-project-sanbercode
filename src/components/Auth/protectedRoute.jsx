import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Jika user tidak ada, redirect ke halaman login
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
