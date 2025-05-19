import React from "react";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";

import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppoinment from "./pages/Admin/AllAppoinment";
import AddDoctors from "./pages/Admin/AddDoctors";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorDhashbord from "./pages/Doctor/DoctorDhashbord";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { useSelector } from "react-redux";

const App = () => {
  const aToken = useSelector(state=>state.admin.aToken);
  const dToken = useSelector(state=>state.doctor.dToken);
  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* admin routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appoinmentt" element={<AllAppoinment />} />
          <Route path="/add-doctor" element={<AddDoctors />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* doctor route */}
          <Route path="/doctor-dashboard" element={<DoctorDhashbord />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
