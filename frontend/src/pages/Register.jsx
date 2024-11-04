import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [confirmPassword, setConfirmPassword] = useState('')

    const showSuccesAlert = (icon, title, timer) => {
        Swal.fire({
            position: "top",
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: timer,
        });
    };

    const showAlert = (icon, text) => {
        Swal.fire({
            icon: icon,
            title: 'Oops...',
            text: text,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi input
        if (!username || !password || !confirmPassword || !role) {
            showAlert("error", "Semua data wajib diisi!");
                return;
            }
            
            if (password !== confirmPassword) {
            showAlert("error", "Password dan Confirm Password tidak cocok!");
            return
        }
        
        try {
            await axios.post("http://localhost:3000/register", {
                username,
                password,
                role,
            });
            console.log("User registered");
            showSuccesAlert("success", "Register Succes!", 2800);
            setTimeout(() => {
                window.location.href = "/login";
            }, 1800);
        } catch (err) {
            console.error(err);
            showAlert("error", "Register gagal!");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl mb-4 text-center">Register</h2>
                <div className="mb-4">
                    <label className="block mb-2">
                        Username<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        Confirm Password<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {/* <div className="mb-4">
                    <label className="block mb-2">
                        Role<span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full p-2 border rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div> */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                    Register
                </button>
                <p className="text-center mt-8">
                    Sudah punya akun?{" "}
                    <NavLink to="/login" className="text-blue-500 underline">
                        Login
                    </NavLink>
                </p>
            </form>
        </div>
    );
};

export default Register;
