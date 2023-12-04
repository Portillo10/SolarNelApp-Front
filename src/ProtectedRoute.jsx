import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute = () => {

  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Cargando</p>;
  if (!isAuthenticated && !loading) return <Navigate to={"/login"} replace />
  return <Outlet />
}