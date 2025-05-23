import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../context/auth.context";

type ProtectedRouteProps = {
  redirectPath?: string;
};

const ProtectedRoute = ({ redirectPath = "/login" }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) {
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
