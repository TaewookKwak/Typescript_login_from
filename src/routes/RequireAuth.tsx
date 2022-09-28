import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

type RequireAuthProps = {
  allowedRoles?: any;
  auth?: any;
};

const RequireAuth = ({ allowedRoles, auth }: RequireAuthProps) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return auth ? (
    <Navigate to="/Dashboard" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
