import React, { Suspense, useEffect } from "react";
import "@/assets/css/App.css";
import { getItem, getSessionStorage } from "@services/sessionStorage/session";

import MyRoutes from "@/routes/MyRoutes";
import { MutatingDots } from "react-loader-spinner";
import LoadingSpinner from "@/components/loadingSpinner";

function App() {
  const auth = getItem("auth");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {/* Router setting */}
      <MyRoutes />
    </Suspense>
  );
}

export default App;
