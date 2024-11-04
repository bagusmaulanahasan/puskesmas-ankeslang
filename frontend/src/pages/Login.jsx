import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
        if (!username || !password) {
            showAlert("error", "Username dan Password wajib diisi!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/login", {
                username,
                password,
            });
            const role = res.data.role;
            console.log(role); // Tambahkan ini untuk memastikan role diterima
            // Simpan token di localStorage
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard", { state: { role } });
            // localStorage.setItem('role', role);
        } catch (err) {
            console.error(err);
            showAlert("error", "Username atau Password Salah!");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl mb-4 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                    Login
                </button>
                <p className="text-center mt-8">
                    Belum punya akun?{" "}
                    <NavLink to="/register" className="text-blue-500 underline">
                        Register
                    </NavLink>
                </p>
            </form>
        </div>
    );
};

export default Login;
