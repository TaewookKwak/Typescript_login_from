import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "@/routes/MyLayout";
import IsLoggedIn from "@/routes/IsLogedIn";
import RequireAuth from "@/routes/RequireAuth";
// pages
import Login from "@/pages/LOGIN/login";
import Dashboard from "@/pages/DASHBOARD/dashboard";
import { getItem, getSessionStorage } from "@services/sessionStorage/session";
import Tranining from "@/pages/TRAINING/tranining";
import Monitoring from "@/pages/MONITORING/monitoring";
import Management from "@/pages/MANAGEMENT/management";
function App() {
  const auth = getItem("auth");
  console.log(auth);

  return (
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
  );
}

export default App;
