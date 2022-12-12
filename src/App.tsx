import React, { Suspense, useEffect } from "react";
import "@/assets/css/App.css";
import { getItem, getSessionStorage } from "@services/sessionStorage/session";

import MyRoutes from "@/routes/MyRoutes";
import { MutatingDots } from "react-loader-spinner";

function App() {
  const auth = getItem("auth");

  return (
    <Suspense
      fallback={
        <MutatingDots
          wrapperClass="spinner"
          color="#1ccaff"
          secondaryColor="#1ccaff"
        />
      }
    >
      {/* Router setting */}
      <MyRoutes />
    </Suspense>
  );
}

export default App;
