import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import BackgroundLogin from '../assets/clipboard-stethoscope.jpg'

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        nik: "",
        nama_lengkap: "",
        umur: "",
        jenis_kelamin: "",
        alamat: ""
    });

    const role = "user";

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
            title: "Oops...",
            text: text,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { username, password, confirmPassword, nik, nama_lengkap, umur, jenis_kelamin, alamat } = formData;
    
        // Validasi input
        if (!username || !password || !confirmPassword || !role || !nik || !nama_lengkap || !umur || !jenis_kelamin || !alamat) {
            showAlert("error", "Semua data wajib diisi!");
            return;
        }
    
        if (password !== confirmPassword) {
            showAlert("error", "Password dan Confirm Password tidak cocok!");
            return;
        }
    
        try {
            // Cek apakah username atau NIK sudah ada di database
            const checkResponse = await axios.post("http://localhost:3000/check-user", {
                username,
                nik,
            });
    
            if (checkResponse.data.usernameExists) {
                showAlert("error", "Username sudah terdaftar, gunakan username lain!");
                return;
            }
    
            if (checkResponse.data.nikExists) {
                showAlert("error", "NIK sudah terdaftar, periksa kembali data Anda!");
                return;
            }
    
            // Jika tidak ada duplikasi, lanjutkan registrasi
            await axios.post("http://localhost:3000/register", {
                username,
                password,
                role,
                nik,
                nama_lengkap,
                umur,
                jenis_kelamin,
                alamat,
            });
    
            console.log("User registered");
            showSuccesAlert("success", "Register Success!", 2800);
            setTimeout(() => {
                window.location.href = "/login";
            }, 1800);
        } catch (err) {
            console.error(err);
            showAlert("error", "Register gagal!");
        }
    };
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const { username, password, confirmPassword, nik, nama_lengkap, umur, jenis_kelamin, alamat } = formData;
    
    //     // Validasi input
    //     if (!username || !password || !confirmPassword || !role || !nik || !nama_lengkap || !umur || !jenis_kelamin || !alamat) {
    //         showAlert("error", "Semua data wajib diisi!");
    //         return;
    //     }
    
    //     if (password !== confirmPassword) {
    //         showAlert("error", "Password dan Confirm Password tidak cocok!");
    //         return;
    //     }
    
    //     try {
    //         await axios.post("http://localhost:3000/register", {
    //             username,
    //             password,
    //             role,
    //             nik,
    //             nama_lengkap,
    //             umur,
    //             jenis_kelamin,
    //             alamat,
    //         });
    //         console.log("User registered");
    //         showSuccesAlert("success", "Register Succes!", 2800);
    //         setTimeout(() => {
    //             window.location.href = "/login";
    //         }, 1800);
    //     } catch (err) {
    //         console.error(err);
    //         showAlert("error", "Register gagal!");
    //     }
    // };
    
    
    
    return (
        <div className="flex justify-center items-center h-screen" style={{
            backgroundImage: `url(${BackgroundLogin})`,
            backgroundSize: `cover`,
        }}>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-4/5 lg:w-3/5">
                <h2 className="text-2xl mb-4 text-center">Register</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kolom Kiri */}
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2">Username<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Password<span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Confirm Password<span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Kolom Kanan */}
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2">NIK<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                name="nik"
                                value={formData.nik}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Nama Lengkap<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                name="nama_lengkap"
                                value={formData.nama_lengkap}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Umur<span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                name="umur"
                                value={formData.umur}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Jenis Kelamin<span className="text-red-500">*</span></label>
                            <select
                                className="w-full p-2 border rounded"
                                name="jenis_kelamin"
                                value={formData.jenis_kelamin}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Alamat<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Tombol Submit */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto"
                    >
                        Register
                    </button>
                </div>

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




// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { NavLink } from "react-router-dom";

// const Register = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const role = "user";

//     const showSuccesAlert = (icon, title, timer) => {
//         Swal.fire({
//             position: "top",
//             icon: icon,
//             title: title,
//             showConfirmButton: false,
//             timer: timer,
//         });
//     };

//     const showAlert = (icon, text) => {
//         Swal.fire({
//             icon: icon,
//             title: 'Oops...',
//             text: text,
//         });
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validasi input
//         if (!username || !password || !confirmPassword || !role) {
//             showAlert("error", "Semua data wajib diisi!");
//                 return;
//             }
            
//             if (password !== confirmPassword) {
//             showAlert("error", "Password dan Confirm Password tidak cocok!");
//             return
//         }
        
//         try {
//             await axios.post("http://localhost:3000/register", {
//                 username,
//                 password,
//                 role,
//             });
//             console.log("User registered");
//             showSuccesAlert("success", "Register Succes!", 2800);
//             setTimeout(() => {
//                 window.location.href = "/login";
//             }, 1800);
//         } catch (err) {
//             console.error(err);
//             showAlert("error", "Register gagal!");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded shadow-md w-80"
//             >
//                 <h2 className="text-2xl mb-4 text-center">Register</h2>
//                 <div className="mb-4">
//                     <label className="block mb-2">
//                         Username<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         className="w-full p-2 border rounded"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">
//                         Password<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="password"
//                         className="w-full p-2 border rounded"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2">
//                         Confirm Password<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="password"
//                         className="w-full p-2 border rounded"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-2 px-4 rounded w-full"
//                 >
//                     Register
//                 </button>
//                 <p className="text-center mt-8">
//                     Sudah punya akun?{" "}
//                     <NavLink to="/login" className="text-blue-500 underline">
//                         Login
//                     </NavLink>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Register;