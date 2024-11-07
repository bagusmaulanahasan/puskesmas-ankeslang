import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import HomePage from './pages/Homepage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPatient from './fragments/EditPetient.jsx';
import QueueCard from './fragments/QueueCard.jsx';

// import AdminDashboard from './pages/AdminDashboard.jsx'
// import DoctorDashboard from './pages/DoctorDashboard.jsx'
// import UserDashboard from './pages/UserDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit" element={<EditPatient />} />
        <Route path="/kartu-antrian/:patientId" element={<QueueCard />} />
      </Routes>
    </Router>
  </StrictMode>,
);
