import Footer from "@/components/Layouts/footer";
import Header from "@/components/Layouts/header";
import React from "react";
import { Outlet } from "react-router-dom";

const MyLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MyLayout;
