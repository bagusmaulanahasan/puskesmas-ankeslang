import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery'; // Menggunakan jQuery untuk DataTables
import * as XLSX from "xlsx";

const HistoryDeletePasien = () => {
    const [historyData, setHistoryData] = useState([]);

    // Mengambil data dari API
    useEffect(() => {
        axios.get('http://localhost:3000/history_delete_pasien')
            .then(response => {
                setHistoryData(response.data); // Menyimpan data pasien yang dihapus
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Menggunakan DataTables setelah data dimuat
    useEffect(() => {
        if (historyData.length > 0) {
            $('#historyTable').DataTable(); // Inisialisasi DataTables
        }
    }, [historyData]);

        
    // Fungsi untuk mengekspor data ke Excel
    // const exportToExcel = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(historyData);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "History Pasien Terhapus");
    //     XLSX.writeFile(workbook, "history_pasien_terhapus.xlsx");
    // };

const exportToExcel = () => {
    // Modifikasi historyData: ubah waktu_terhapus menjadi format waktu yang lebih mudah dibaca
    const modifiedData = historyData.map((item) => ({
        ...item,
        waktu_periksa: new Date(item.waktu_periksa).toLocaleString(),  // Mengubah waktu menjadi format yang mudah dibaca
        waktu_terhapus: new Date(item.waktu_terhapus).toLocaleString(),  // Mengubah waktu menjadi format yang mudah dibaca
    }));

    // Membuat worksheet dari data yang dimodifikasi
    const worksheet = XLSX.utils.json_to_sheet(modifiedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "History Pasien Terhapus");
    
    // Menulis file Excel
    XLSX.writeFile(workbook, "history_pasien_terhapus.xlsx");
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
            <table id="historyTable" className="display w-1/3">
                <thead className="bg-blue-500 text-white">
                    <tr className="border-b">
                        <th>NIK</th>
                        <th>Nama Lengkap</th>
                        <th>Umur</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>poli</th>
                        <th>No. Antrian</th>
                        <th>Waktu Periksa</th>
                        <th>Username Pendaftar</th>
                        <th>Waktu Dihapus</th>
                        <th>Dihapus Oleh</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td>{item.nik}</td>
                            <td>{item.nama_lengkap}</td>
                            <td>{item.umur}</td>
                            <td>{item.jenis_kelamin}</td>
                            <td>{item.alamat}</td>
                            <td>{item.poli}</td>
                            <td>{item.nomor_antrian}</td>
                            <td>{new Date(item.waktu_periksa).toLocaleString(
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
                            <td>{item.username_pendaftar}</td>
                            <td>{new Date(item.waktu_periksa).toLocaleString(
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
                            <td>{item.dihapus_oleh_admin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryDeletePasien;
