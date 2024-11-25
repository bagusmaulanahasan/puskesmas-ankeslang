import React from 'react';
// import DoctorDashboard from '../fragments/DoctorDashboard';
import UserDashboard from '../components/Fragments/UserDashboard';
import AdminDashboard from '../components/Fragments/AdminDashboard';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Elements/Navbar';

const Dashboard = () => {
  const location = useLocation();
  const { role } = location.state || {};
  
  const username = localStorage.getItem("username")

  return (
    <div>
      <Navbar username={username} />
      {role === 'user' && <UserDashboard />}
      {/* {role === 'doctor' && <DoctorDashboard />} */}
      {role === 'admin' && <AdminDashboard />}
      {!role && <h1 className="text-2xl">Role not found</h1>}
    </div>
  );
};

export default Dashboard;
