import React, { Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getItem, getSessionStorage } from "@services/sessionStorage/session";
import MyLayout from "@/routes/MyLayout";
import IsLoggedIn from "@/routes/IsLogedIn";
import RequireAuth from "@/routes/RequireAuth";
// pages
// import Login from "@/pages/LOGIN/login";
// import Dashboard from "@/pages/DASHBOARD/dashboard";
// import Tranining from "@/pages/TRAINING/tranining";
// import Monitoring from "@/pages/MONITORING/monitoring";
// import Management from "@/pages/MANAGEMENT/management";

import { MutatingDots } from "react-loader-spinner";

// lazy 추가 221005
const Login = React.lazy(() => import("@/pages/LOGIN/login"));
const Dashboard = React.lazy(() => import("@/pages/DASHBOARD/dashboard"));
const Tranining = React.lazy(() => import("@/pages/TRAINING/tranining"));
const Monitoring = React.lazy(() => import("@/pages/MONITORING/monitoring"));
const Management = React.lazy(() => import("@/pages/MANAGEMENT/management"));

function App() {
  const auth = getItem("auth");
  console.log(auth);

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
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route element={<IsLoggedIn auth={auth} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* <Route element={<RequireAuth auth={auth} />}>
          <Route path="/" element={<Dashboard />} />
        </Route> */}

          <Route element={<RequireAuth auth={auth} />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<RequireAuth auth={auth} />}>
            <Route path="/Management" element={<Management />} />
          </Route>

          <Route element={<RequireAuth auth={auth} />}>
            <Route path="/Training" element={<Tranining />} />
          </Route>

          <Route element={<RequireAuth auth={auth} />}>
            <Route path="/Monitoring" element={<Monitoring />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
