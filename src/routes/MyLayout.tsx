import Footer from "@/components/Layouts/footer";
import Header from "@/components/Layouts/header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const MyLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Header />
      <Outlet />
      {pathname === "/Dashboard" && <Footer />}
    </>
  );
};

export default MyLayout;
