import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Guest = ({ children }) => {
  const { authLoading, user } = useAuth();

  if (authLoading) return null;
  if (user) return <Navigate to="/" replace />;

  return children;
};

export default Guest;
