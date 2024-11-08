import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackgroundLogin from '../assets/clipboard-stethoscope.jpg'


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
            console.log(role); // Memastikan role  diterima
            // Simpan token di localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", username);  // Menyimpan username
            navigate("/dashboard", { state: { role } });
            // localStorage.setItem('role', role);
        } catch (err) {
            console.error(err);
            showAlert("error", "Username atau Password Salah!");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen relative" style={{
            backgroundImage: `url(${BackgroundLogin})`,
            backgroundSize: `cover`,
        }}>
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
                    <NavLink to="/register" className="text-blue-500 no-underline">
                        Register
                    </NavLink>
                </p>
            </form>
            <div className=" absolute bg-white p-4 rounded-bl-xl right-0 top-0 flex gap-2 font-semibold">
                <button className="bg-slate-600 rounded-xl px-8 py-2">
                    <Link to="/" className="text-white no-underline">Back to Home Page...</Link>
                </button>
            </div>
        </div>

    );
};

export default Login;
