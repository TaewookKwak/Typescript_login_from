import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MyLayout from "@/routes/MyLayout";
import RequireAuth from "@/routes/RequireAuth";

// lazy 추가 221005
const DatasetManagement = React.lazy(
  () => import("@pages/DATASETMANAGEMENT/datasetManagement")
);
const Login = React.lazy(() => import("@/pages/LOGIN/login"));
const Home = React.lazy(() => import("@pages/DASHBOARD/home"));
const FetchData = React.lazy(() => import("@pages/FETCHDATA/fetchData"));
const Tranining = React.lazy(() => import("@/pages/TRAINING/tranining"));
const Monitoring = React.lazy(() => import("@/pages/MONITORING/monitoring"));
const Management = React.lazy(() => import("@/pages/MANAGEMENT/management"));
const ErrorPage = React.lazy(() => import("@pages/ETC/ErrorPage"));

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Home" element={<Home />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Dataset/FetchData" element={<FetchData />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Dataset/Management" element={<DatasetManagement />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Management" element={<Management />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Training" element={<Tranining />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/Monitoring" element={<Monitoring />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
