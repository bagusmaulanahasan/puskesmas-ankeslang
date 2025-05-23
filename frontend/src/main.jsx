import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomePage from "./pages/Homepage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ClosedPage from "./pages/ClosedPage.jsx";
// import EditPatient from './fragments/EditPetient.jsx';
// import QueueCard from './fragments/QueueCard.jsx';

// Komponen wrapper untuk pengecekan waktu
const TimeCheckWrapper = ({ children }) => {
    const hour = new Date().getHours();

    // Cek jika dalam jam tutup (21:00 - 08:00)
    if (hour >= 21 || hour < 6) {
        return <ClosedPage />; // Tampilkan halaman tutup
    }

    // Tampilkan anak komponen (route lainnya)
    return children;
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <TimeCheckWrapper>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rute wildcard untuk menangani semua path yang lain */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </TimeCheckWrapper>
        </Router>
    </StrictMode>
);
