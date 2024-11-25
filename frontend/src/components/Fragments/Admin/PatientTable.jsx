import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

const PatientTable = () => {
    const [patients, setPatients] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost:3000/pasien");
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);


    useEffect(() => {
        if (patients.length > 0) {
            $(document).ready(function () {
                // Cek jika DataTable sudah diinisialisasi
                if ($.fn.dataTable.isDataTable('#patientsTable')) {
                    $('#patientsTable').DataTable().destroy();  // Hancurkan DataTable yang sudah ada
                }
                // Inisialisasi DataTable kembali
                $("#patientsTable").DataTable({
                    "order": [[0, 'desc']] // Mengurutkan berdasarkan kolom pertama (indeks 0) secara descending
                });
            });
        }
    }, [patients]);

    // Fungsi untuk mengekspor data ke Excel
    const exportToExcel = () => {
        // Modifikasi historyData: ubah waktu_terhapus menjadi format waktu yang lebih mudah dibaca
        const modifiedData = patients.map((item) => ({
            ...item,
            waktu_periksa: new Date(item.waktu_periksa).toLocaleString(),  // Mengubah waktu menjadi format yang mudah dibaca
        }));
    
        // Membuat worksheet dari data yang dimodifikasi
        const worksheet = XLSX.utils.json_to_sheet(modifiedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pasien");
        
        // Menulis file Excel
        XLSX.writeFile(workbook, "data_pasien.xlsx");
    };

    const handleEdit = (patient) => {
        setCurrentPatient(patient);
        setShowEditModal(true); // Buka modal
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCurrentPatient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(
                `http://localhost:3000/pasien/${currentPatient.id}`,
                currentPatient
            );
            Swal.fire("Berhasil", "Data pasien berhasil diperbarui", "success");
            setShowEditModal(false);
            fetchPatients(); // Refresh data
        } catch (error) {
            console.error("Error updating patient:", error);
            Swal.fire("Gagal", "Gagal memperbarui data pasien", "error");
        }
    };

    // Fungsi untuk menghapus pasien dengan konfirmasi
    const handleDelete = async (id) => {
        // Menampilkan SweetAlert konfirmasi
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data pasien akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            customClass: {
                confirmButton: 'bg-red-600 text-white border-none hover:bg-red-700',
                cancelButton: 'bg-gray-400 text-white border-none hover:bg-gray-500'
            }
        });
    
        // Jika pengguna mengonfirmasi, lanjutkan dengan penghapusan
        if (result.isConfirmed) {
            try {
                // Melakukan penghapusan data pasien
                // await axios.delete(`http://localhost:3000/pasien/${id}`);

                // Ambil username admin dari localStorage
                const username = localStorage.getItem("username");
                // Hapus data dari tabel users dengan mengirimkan username melalui header
                await axios.delete(`http://localhost:3000/pasien/${id}`, {
                    headers: {
                        username: username, // Mengirimkan username dalam header
                    },
                });

                Swal.fire('Dihapus!', 'Data pasien telah dihapus.', 'success');
                fetchPatients(); // Memperbarui daftar pasien
            } catch (error) {
                console.error("Error deleting patient:", error);
                Swal.fire('Gagal', 'Gagal menghapus data pasien.', 'error');
            }
        } else {
            // Menampilkan pesan jika pengguna membatalkan
            Swal.fire('Dibatalkan', 'Data pasien tidak dihapus.', 'info');
        }
    };

    return (
        <div className="container p-4 mt-32">
            <h2 className="text-2xl font-bold mb-4">Data Pasien</h2>
            <button
                onClick={exportToExcel}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Ekspor ke Excel
            </button>
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
                        <th>Username Pendaftar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.nik}</td>
                            <td>{patient.nama_lengkap}</td>
                            <td>{patient.jenis_kelamin}</td>
                            <td className="text-center">{patient.umur}</td>
                            <td>{patient.alamat}</td>
                            <td>
                                {patient.poli
                                    .replaceAll("_", " ")
                                    .split(" ")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")
                                    .replace("D", "d")}
                            </td>
                            <td className="text-center">{patient.nomor_antrian}</td>
                            <td>
                                {new Date(patient.waktu_periksa).toLocaleString(
                                    "id-ID",
                                    {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    }
                                )}
                            </td>
                            <td>{patient.pendaftar}</td>
                            <td>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(patient)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(patient.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pasien</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>NIK</label>
                        <input
                            type="text"
                            name="nik"
                            value={currentPatient?.nik || ""}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama_lengkap"
                            value={currentPatient?.nama_lengkap || ""}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <label>Jenis Kelamin</label>
                        <select
                            name="jenis_kelamin"
                            value={currentPatient?.jenis_kelamin || "laki-laki"}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>

                        <label>Umur</label>
                        <input
                            type="number"
                            name="umur"
                            value={currentPatient?.umur || ""}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <label>Alamat</label>
                        <input
                            type="text"
                            name="alamat"
                            value={currentPatient?.alamat || ""}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <label>Poli</label>
                        <select
                            name="poli"
                            value={currentPatient?.poli || "umum"} // Jika currentPatient?.poli tidak ada, default ke "umum"
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        >
                            <option value="umum">Umum</option>
                            <option value="ibu_dan_anak">Ibu dan Anak</option>
                            <option value="gigi_dan_mulut">Gigi dan Mulut</option>
                        </select>

                        <label>Nomor Antrian</label>
                        <input
                            type="text"
                            name="nomor_antrian"
                            value={currentPatient?.nomor_antrian || ""}
                            onChange={handleEditChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={handleEditSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PatientTable;
