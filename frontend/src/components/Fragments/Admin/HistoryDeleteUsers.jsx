import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import * as XLSX from "xlsx";
import "datatables.net-dt/css/dataTables.dataTables.css";

const HistoryDeleteUsers = () => {
    const [history, setHistory] = useState([]);

    // Fetch data dari endpoint history_delete_users
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/history_delete_users"
                );
                setHistory(response.data);
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        };

        fetchHistory();
    }, []);

    // Initialize DataTable setelah data di-load
    useEffect(() => {
        if (history.length > 0) {
            $(document).ready(() => {
                $("#historyTable").DataTable();
            });
        }
    }, [history]);
    
    const exportToExcel = () => {
        // Modifikasi historyData: ubah waktu_terhapus menjadi format waktu yang lebih mudah dibaca
        const modifiedData = history.map((item) => ({
            ...item,
            waktu_terhapus: new Date(item.waktu_terhapus).toLocaleString(),  // Mengubah waktu menjadi format yang mudah dibaca
        }));
    
        // Membuat worksheet dari data yang dimodifikasi
        const worksheet = XLSX.utils.json_to_sheet(modifiedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "History Users Terhapus");
        
        // Menulis file Excel
        XLSX.writeFile(workbook, "history_users_terhapus.xlsx");
    };
    
    return (
        <div className="container mx-auto p-4 mt-32">
            <h2 className="text-2xl font-bold mb-4">History Data Users</h2>
            <button
                onClick={exportToExcel}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Ekspor ke Excel
            </button>
            <table id="historyTable" className="display w-1/2">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th>Username</th>
                        <th>NIK</th>
                        <th>Nama Lengkap</th>
                        <th>Jenis Kelamin</th>
                        <th>Umur</th>
                        <th>Alamat</th>
                        <th>Waktu Terhapus</th>
                        <th>Dihapus oleh </th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.nik}</td>
                            <td>{user.nama_lengkap}</td>
                            <td>{user.jenis_kelamin}</td>
                            <td className="text-center">{user.umur}</td>
                            <td>{user.alamat}</td>
                            <td>{new Date(user.waktu_terhapus).toLocaleString(
                                    "id-ID",
                                    {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    }
                                )}</td>
                            <td>{user.dihapus_oleh_admin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryDeleteUsers;
