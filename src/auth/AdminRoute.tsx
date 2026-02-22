import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { LoadingSpinner } from "../utils/Icons";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAdmin, loading } = useAuth();

  // Still checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Admin access granted
  return <>{children}</>;
}
