import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

const Protected = ({ children }) => {
  const { authLoading, user } = useAuth();

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default Protected;
