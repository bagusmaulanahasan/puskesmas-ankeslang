// import React, { useEffect, useState } from "react";
// import $ from "jquery";
// import "datatables.net-dt";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import * as XLSX from "xlsx";

// const PatientTable = () => {
//     const [data, setData] = useState([]); // Untuk menyimpan data pasien
//     const [filter, setFilter] = useState(""); // Untuk menyimpan kategori filter

//     useEffect(() => {
//         // Mengambil data pasien dari API atau sumber data lainnya
//         // Contoh data, sesuaikan dengan data nyata Anda
//         const fetchData = async () => {
//             const result = await fetch("http://localhost:3000/pasien"); // Ganti dengan endpoint Anda
//             const json = await result.json();
//             setData(json);
//         };
//         fetchData();

//         // Menginisialisasi DataTable setelah komponen di-mount
//         $("#myTable").DataTable();

//         return () => {
//             // Membersihkan DataTable saat komponen di-unmount
//             $("#myTable").DataTable().destroy(true);
//         };
//     }, []);

//     // Fungsi untuk mengekspor data ke Excel
//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
//         XLSX.writeFile(workbook, "patients.xlsx");
//     };

//     // Fungsi untuk menangani perubahan filter
//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//         // Logika filter dapat ditambahkan di sini jika perlu
//     };

//     // Filter data berdasarkan kategori jika diperlukan
//     const filteredData =
//         filter === "today"
//             ? data.filter(
//                 (patient) =>
//                     new Date(patient.waktu_periksa).toDateString() ===
//                     new Date().toDateString()
//                 )
//             : filter === "poli"
//             ? data.filter((patient) => patient.poli === "umum") // Ganti 'desiredPoli' sesuai kebutuhan
//             : data;


//     return (
//         <div>
//             <div>
//                 <label>
//                     Filter:
//                     <select onChange={handleFilterChange} value={filter}>
//                         <option value="">Semua</option>
//                         <option value="today">Hari Ini</option>
//                         <option value="poli">Berdasarkan Poli</option>
//                     </select>
//                 </label>
//                 <button onClick={exportToExcel}>Ekspor ke Excel</button>
//             </div>
//             <table id="myTable" className="display">
//                 <thead>
//                         <tr>
//                         <th>NIK</th>
//                         <th>Nama Lengkap</th>
//                         <th>Jenis Kelamin</th>
//                         <th>Umur</th>
//                         <th>Alamat</th>
//                         <th>Poli</th>
//                         <th>Nomor Antrian</th>
//                         <th>Waktu Periksa</th>
//                         </tr>
//                 </thead>
//                 <tbody>
//                     {filteredData.map((patient, index) => (
//                             <tr key={patient.nik}>
//                             <td>{patient.nik}</td>
//                             <td>{patient.nama_lengkap}</td>
//                             <td>{patient.jenis_kelamin}</td>
//                             <td>{patient.umur}</td>
//                             <td>{patient.alamat}</td>
//                             <td>{patient.poli}</td>
//                             <td>{patient.nomor_antrian}</td>
//                             <td>{new Date(patient.waktu_periksa).toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PatientTable;


import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import * as XLSX from "xlsx";


const PatientTable = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get("http://localhost:3000/pasien")
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        // Initialize DataTables when data is loaded
        if (patients.length > 0) {
            $(document).ready(function () {
                $('#patientsTable').DataTable();
            });
        }
    }, [patients]);

        // Fungsi untuk mengekspor data ke Excel
        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(patients);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
            XLSX.writeFile(workbook, "patients.xlsx");
        };

    return (
        <div className="container mx-auto p-4 pt-32">
            <h2 className="text-2xl font-bold mb-4">Daftar Pasien</h2>
            <button onClick={exportToExcel} className="bg-blue-500 text-white px-4 py-2 rounded">Ekspor ke Excel</button>
            <table id="patientsTable" className="display w-full">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th>NIK</th>
                        <th>Nama Lengkap</th>
                        <th>Jenis Kelamin</th>
                        <th>Umur</th>
                        <th>Alamat</th>
                        <th>Poli</th>
                        <th>Nomor Antrian</th>
                        <th>Waktu Periksa</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.nik}>
                            <td>{patient.nik}</td>
                            <td>{patient.nama_lengkap}</td>
                            <td>{patient.jenis_kelamin}</td>
                            <td>{patient.umur}</td>
                            <td>{patient.alamat}</td>
                            <td>{patient.poli}</td>
                            <td>{patient.nomor_antrian}</td>
                            <td>{new Date(patient.waktu_periksa).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
