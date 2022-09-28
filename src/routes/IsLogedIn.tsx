import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type IsLoggedInProps = {
  auth?: string;
  location?: any;
};

const IsLoggedIn = ({ auth, location }: IsLoggedInProps) => {
  const next = useLocation();
  console.log(next);

  return (
    <>
      {auth ? (
        <Navigate to="/Dashboard" state={{ from: next }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default IsLoggedIn;
