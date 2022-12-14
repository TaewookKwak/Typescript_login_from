import { isEmpty } from "@/utils/common/commonUtils";
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

const RequireAuth = ({ auth }: RequireAuthProps) => {
  // const location = useLocation();

  return <Outlet />;

  // return !isEmpty(auth) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;
