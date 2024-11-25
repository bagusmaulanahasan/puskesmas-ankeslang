// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Modal } from "react-bootstrap"; // pastikan install react-bootstrap

// const EditPatient = () => {
//     const [patients, setPatients] = useState([]);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [currentPatient, setCurrentPatient] = useState(null);

//     useEffect(() => {
//         fetchPatients();
//     }, []);

//     const fetchPatients = async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/pasien");
//             setPatients(response.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const handleEdit = (patient) => {
//         setCurrentPatient(patient);
//         setShowEditModal(true); // Buka modal
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentPatient((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleEditSubmit = async () => {
//         try {
//             await axios.put(
//                 `http://localhost:3000/pasien/${currentPatient.id}`,
//                 currentPatient
//             );
//             Swal.fire("Berhasil", "Data pasien berhasil diperbarui", "success");
//             setShowEditModal(false);
//             fetchPatients(); // Refresh data
//         } catch (error) {
//             console.error("Error updating patient:", error);
//             Swal.fire("Gagal", "Gagal memperbarui data pasien", "error");
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 pt-32">
//             <h2 className="text-2xl font-bold mb-4">Edit Daftar Pasien</h2>

//             {/* Edit Modal */}
//             <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Pasien</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form>
//                         <label>NIK</label>
//                         <input
//                             type="text"
//                             name="nik"
//                             value={currentPatient?.nik || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />

//                         <label>Nama Lengkap</label>
//                         <input
//                             type="text"
//                             name="nama_lengkap"
//                             value={currentPatient?.nama_lengkap || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />

//                         <label>Jenis Kelamin</label>
//                         <select
//                             name="jenis_kelamin"
//                             value={currentPatient?.jenis_kelamin || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         >
//                             <option value="Laki-laki">Laki-laki</option>
//                             <option value="Perempuan">Perempuan</option>
//                         </select>

//                         <label>Umur</label>
//                         <input
//                             type="number"
//                             name="umur"
//                             value={currentPatient?.umur || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />

//                         <label>Alamat</label>
//                         <input
//                             type="text"
//                             name="alamat"
//                             value={currentPatient?.alamat || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />

//                         <label>Poli</label>
//                         <input
//                             type="text"
//                             name="poli"
//                             value={currentPatient?.poli || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />

//                         <label>Nomor Antrian</label>
//                         <input
//                             type="text"
//                             name="nomor_antrian"
//                             value={currentPatient?.nomor_antrian || ""}
//                             onChange={handleEditChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <button
//                         onClick={handleEditSubmit}
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                     >
//                         Simpan
//                     </button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default EditPatient;