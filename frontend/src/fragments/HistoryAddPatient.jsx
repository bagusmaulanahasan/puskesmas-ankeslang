import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

const HistoryAddPatient = () => {
    const [patients, setPatients] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        // Fetch data from the backend
        axios.get("http://localhost:3000/pasien")
            .then((response) => {
                // Filter data pasien berdasarkan username pendaftar
                const filteredPatients = response.data.filter(patient => patient.pendaftar === username);
                setPatients(filteredPatients);
                console.log(filteredPatients);
                
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [username]);

    console.log('username saat ini adalah : ' + username)

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
                        <tr key={[patient.id]}>
                            <td>{patient.nik}</td>
                            <td>{patient.nama_lengkap}</td>
                            <td>{patient.jenis_kelamin}</td>
                            <td>{patient.umur}</td>
                            <td>{patient.alamat}</td>
                            <td>{patient.poli.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('D', 'd')}</td>
                            <td>{patient.nomor_antrian}</td>
                            <td>{new Date(patient.waktu_periksa).toLocaleString('id-ID', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryAddPatient;