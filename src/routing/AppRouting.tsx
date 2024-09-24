import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import NotFound from "../components/WildCard/NotFound";
import Navbar from "../pages/Navbar/Navbar";
import Patients from "../pages/Patients/Patients";
import PatientDetail from "../pages/Patients/PatientDetails";

const AppRouting = () => {

  return (
    <Routes>
      {/* Private route start */}
      <Route path="/" element={<PrivateLayout />}>
        {/* <Route path="/dashboard" index element={<Dashboard />} /> */}
      </Route>
      {/* Private route end */}

      {/* Public route start */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:name" element={<PatientDetail />} />

      </Route>
      {/* Public route end */}

      {/* Not found route start */}
      <Route path="*" element={<NotFound />} />
      {/* Not found route end */}
    </Routes>
  );
};

export default AppRouting;
