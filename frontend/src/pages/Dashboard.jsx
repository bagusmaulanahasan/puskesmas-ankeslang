import React from 'react';
// import DoctorDashboard from '../fragments/DoctorDashboard';
import UserDashboard from '../fragments/UserDashboard';
import AdminDashboard from '../fragments/AdminDashboard';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const location = useLocation();
  const { role } = location.state || {};
  console.log(role);

  return (
    <div>
      <Navbar role={role} />
      {role === 'user' && <UserDashboard />}
      {/* {role === 'doctor' && <DoctorDashboard />} */}
      {role === 'admin' && <AdminDashboard />}
      {!role && <h1 className="text-2xl">Role not found</h1>}
    </div>
  );
};

export default Dashboard;
