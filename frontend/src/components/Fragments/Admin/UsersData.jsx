import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from "sweetalert2";

const UsersData = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        role: "",
        nik: "",
        nama_lengkap: "",
        umur: "",
        jenis_kelamin: "",
        alamat: "",
    });

    // Fetch users data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Initialize DataTable
    useEffect(() => {
        if (users.length > 0) {
            $(document).ready(function () {
                $("#usersTable").DataTable();
            });
        }
    }, [users]);

    // Handle delete user
    const handleDelete = async (id) => {
        // Menampilkan SweetAlert konfirmasi
        const result = await Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data pasien akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, hapus!",
            cancelButtonText: "Batal",
            reverseButtons: true,
            customClass: {
                confirmButton:
                    "bg-red-600 text-white border-none hover:bg-red-700",
                cancelButton:
                    "bg-gray-400 text-white border-none hover:bg-gray-500",
            },
        });

        // Jika pengguna mengonfirmasi, lanjutkan dengan penghapusan
        if (result.isConfirmed) {
            try {
                // // Hapus data dari tabel users
                // await axios.delete(`http://localhost:3000/users/${id}`);

                // Ambil username admin dari localStorage
                const username = localStorage.getItem("username");
                // Hapus data dari tabel users dengan mengirimkan username melalui header
                await axios.delete(`http://localhost:3000/users/${id}`, {
                    headers: {
                        username: username, // Mengirimkan username dalam header
                    },
                });

                setUsers(users.filter((user) => user.id !== id));
                Swal.fire("Dihapus!", "Data pasien telah dihapus.", "success");
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire("Gagal", "Gagal menghapus data pasien.", "error");
            }
        } else {
            // Menampilkan pesan jika pengguna membatalkan
            Swal.fire("Dibatalkan", "Data pasien tidak dihapus.", "info");
        }
    };

    // Handle edit user
    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            role: user.role,
            nik: user.nik,
            nama_lengkap: user.nama_lengkap,
            umur: user.umur,
            jenis_kelamin: user.jenis_kelamin,
            alamat: user.alamat,
        });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission to update user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            username,
            role,
            nik,
            nama_lengkap,
            umur,
            jenis_kelamin,
            alamat,
        } = formData;

        try {
            await axios.put(`http://localhost:3000/users/${selectedUser.id}`, {
                username,
                role,
                nik,
                nama_lengkap,
                umur,
                jenis_kelamin,
                alamat,
            });

            setUsers(
                users.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, ...formData }
                        : user
                )
            );

            Swal.fire("Berhasil", "Data users berhasil diperbarui", "success");
            setSelectedUser(null);
            setFormData({
                username: "",
                role: "",
                nik: "",
                nama_lengkap: "",
                umur: "",
                jenis_kelamin: "",
                alamat: "",
            });
        } catch (error) {
            console.error("Error updating user:", error);
            Swal.fire("Gagal", "Gagal memperbarui data pasien", "error");
        }
    };

    return (
        <div className="container mx-auto p-4 mt-32">
            <h2 className="text-2xl font-bold mb-4">Data Users</h2>
            <table id="usersTable" className="display w-full">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th>Username</th>
                        <th>NIK</th>
                        <th>Nama Lengkap</th>
                        <th>Umur</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.nik}</td>
                            <td>{user.nama_lengkap}</td>
                            <td className="text-center">{user.umur}</td>
                            <td>{user.jenis_kelamin}</td>
                            <td>{user.alamat}</td>
                            <td className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded px-3"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Form for Editing User */}
            {selectedUser && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 lg:w-3/5 mt-36">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Form kiri */}
                            <div>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">NIK</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        name="nik"
                                        value={formData.nik}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        name="nama_lengkap"
                                        value={formData.nama_lengkap}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            {/* Form Kanan */}
                            <div>
                                <div className="mb-4">
                                    <label className="block mb-2">Umur</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        name="umur"
                                        value={formData.umur}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        Jenis Kelamin
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        name="jenis_kelamin"
                                        value={formData.jenis_kelamin}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Alamat</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        name="alamat"
                                        value={formData.alamat}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            {/* <div className="flex justify-end gap-6"> */}
                            <button
                                type="button"
                                className="bg-gray-400 text-white p-2 rounded-lg"
                                onClick={() => setSelectedUser(null)}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-2 rounded-lg"
                            >
                                Update User
                            </button>
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersData;
