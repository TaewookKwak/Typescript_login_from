import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "@/routes/MyLayout";
import IsLoggedIn from "@/routes/IsLogedIn";
import RequireAuth from "@/routes/RequireAuth";
// pages
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route element={<IsLoggedIn />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
