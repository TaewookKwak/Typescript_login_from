import { isEmpty } from "@/utils/common/commonUtils";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type IsLoggedInProps = {
  auth?: any;
  location?: any;
};

const IsLoggedIn = ({ auth, location }: IsLoggedInProps) => {
  const next = useLocation();
  console.log(next);

  return (
    <>
      {!isEmpty(auth) ? (
        <Navigate to="/Dashboard" state={{ from: next }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default IsLoggedIn;
