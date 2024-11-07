import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const HistoryAddPatient = () => {
    const [patients, setPatients] = useState([]);
    const [isPrinting, setIsPrinting] = useState(false);
    const username = localStorage.getItem("username");

    useEffect(() => {
        // Fetch data dari backend
        axios
            .get("http://localhost:3000/pasien")
            .then((response) => {
                const filteredPatients = response.data.filter(
                    (patient) => patient.pendaftar === username
                );
                setPatients(filteredPatients);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [username]);

    useEffect(() => {
        if (patients.length > 0) {
            $(document).ready(function () {
                $("#patientsTable").DataTable();
            });
        }
    }, [patients]);

    // Fungsi untuk ekspor ke Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(patients);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
        XLSX.writeFile(workbook, "patients.xlsx");
    };

    // Fungsi untuk menampilkan popup kartu antrian dan mencetak
    const handleDownloadCard = (patient) => {
        // Cegah pemanggilan print berulang
        if (isPrinting) return;

        setIsPrinting(true); // Set tampilan cetak aktif
        Swal.fire({
            title: "Kartu Antrian",
            html: `
                 <style>
                     @media print {
                         body * {
                             visibility: hidden;
                         }
                         #printCard * {
                             visibility: visible;
                         }
                         button {
                             display: none;
                         }
                         title {
                             display: none;
                         }
                    
                     }
                 </style>
                <div id="printCard">
                    <div class="p-4 border rounded-lg shadow-lg">
                        <h2 class="text-xl font-bold mb-4">Kartu Antrian</h2>
                        <p><strong>Nama Pasien:</strong> ${
                            patient.nama_lengkap
                        }</p>
                        <p><strong>Poli:</strong> ${patient.poli.replaceAll(
                            "_",
                            " "
                        )}</p>
                        <hr/>
                        <p class="text-6xl">${patient.nomor_antrian}</p>
                        <p> <strong>Nomor Antrian : </strong> </p>
                        <hr/>
                        <p><strong>Waktu Periksa:</strong>
                            <span>${new Date(
                                patient.waktu_periksa
                            ).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}</span>
                            </br></br>
                            <span>${new Date(
                                patient.waktu_periksa
                            ).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            })}</span>
                        </p>
                        <button id="printButton" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Download Kartu
                        </button>
                    </div>
                </div>
            `,
            showCloseButton: true,
            didOpen: () => {
                document
                    .getElementById("printButton")
                    .addEventListener("click", () => {
                        window.print();
                    });
            },
            willClose: () => {
                setIsPrinting(false); // Reset tampilan cetak saat modal ditutup
            },
        });
    };

    return (
        <div className="container mx-auto p-4 mt-32">
            <h2 className="text-2xl font-bold mb-4">Daftar Pasien</h2>
            <button
                onClick={exportToExcel}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Ekspor ke Excel
            </button>
            <table id="patientsTable" className="display w-full mt-4">
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
                        <th>Donwload Kartu</th>
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
                            <td className="text-center">
                                {patient.nomor_antrian}
                            </td>
                            <td>
                                <div>
                                    <span className="block">
                                        {new Date(
                                            patient.waktu_periksa
                                        ).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </span>
                                    <span className="block">
                                        {new Date(
                                            patient.waktu_periksa
                                        ).toLocaleTimeString("id-ID", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDownloadCard(patient)}
                                    className="text-white hover:text-blue-700 no-underline bg-blue-600 p-2 rounded-lg"
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// const HistoryAddPatient = () => {
//     const [patients, setPatients] = useState([]);
//     const username = localStorage.getItem("username");

//     useEffect(() => {
//         // Fetch data from the backend
//         axios
//             .get("http://localhost:3000/pasien")
//             .then((response) => {
//                 // Filter data pasien berdasarkan username pendaftar
//                 const filteredPatients = response.data.filter(
//                     (patient) => patient.pendaftar === username
//                 );
//                 setPatients(filteredPatients);
//             })
//             .catch((error) => console.error("Error fetching data:", error));
//     }, [username]);

//     useEffect(() => {
//         // Initialize DataTables when data is loaded
//         if (patients.length > 0) {
//             $(document).ready(function () {
//                 $("#patientsTable").DataTable();
//             });
//         }
//     }, [patients]);

//     // Fungsi untuk mengekspor data ke Excel
//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(patients);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
//         XLSX.writeFile(workbook, "patients.xlsx");
//     };

//     //     <style>
//     //     /* Hanya tampilkan kartu antrian saat print */
//     //     @media print {
//     //         body * {
//     //             visibility: hidden;
//     //         }
//     //         #printCard, #printCard * {
//     //             visibility: visible;
//     //         }
//     //         #printCard {
//     //             position: absolute;
//     //             left: 0;
//     //             top: 0;
//     //         }
//     //     }
//     //     </style>

//     // Fungsi untuk menampilkan popup kartu antrian
//     const handleDownloadCard = (patient) => {
//         Swal.fire({
//             title: "Kartu Antrian",
//             // html: `
//             //                     <div id="printCard" class="p-4 border rounded-lg shadow-lg">
//             //         <h2 class="text-xl font-bold mb-4">Kartu Antrian</h2>
//             //         <p><strong>Nama Pasien:</strong> ${patient.nama_lengkap}</p>
//             //         <p><strong>Poli:</strong> ${patient.poli.replaceAll(
//             //             "_",
//             //             " "
//             //         )}</p>
//             //         <p><strong>Nomor Antrian:</strong> ${
//             //             patient.nomor_antrian
//             //         }</p>
//             //         <button onclick="window.print()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             //             Download Kartu
//             //         </button>
//             //     </div>
//             // `,
//             html: `
//                 <style>
//                     @media print {
//                         body * {
//                             visibility: hidden;
//                         }
//                         #printCard * {
//                             visibility: visible;
//                         }
//                         button {
//                             display: none;
//                         }
//                         title {
//                             display: none;
//                         }

//                     }

//                 </style>

//                 <div  id="printCard">
//                     <div class="p-4 border rounded-lg shadow-lg">
//                         <h2 class="text-xl font-bold mb-4">Kartu Antrian</h2>
//                         <p><strong>Nama Pasien:</strong> ${
//                             patient.nama_lengkap
//                         }</p>
//                         <p><strong>Poli:</strong> ${patient.poli
//                             .replaceAll("_", " ")
//                             .split(" ")
//                             .map(
//                                 (word) =>
//                                     word.charAt(0).toUpperCase() + word.slice(1)
//                             )
//                             .join(" ")
//                             .replace("D", "d")}</p>
//                         <hr/>
//                         <p class="text-6xl">${patient.nomor_antrian}</p>
//                         <p> <strong>Nomor Antrian : </strong> </p>
//                         <hr/>
//                         <p><strong>Waktu Periksa</strong>
//                             <span className="block">
//                                 ${new Date(
//                                     patient.waktu_periksa
//                                 ).toLocaleTimeString("id-ID", {
//                                     hour: "2-digit",
//                                     minute: "2-digit",
//                                     hour12: false,
//                                 })}
//                             </span>
//                         </p>
//                         <p>
//                             ${new Date(
//                                 patient.waktu_periksa
//                             ).toLocaleDateString(
//                                 "id-ID",
//                                 {
//                                     year: "numeric",
//                                     month: "2-digit",
//                                     day: "2-digit",
//                                 }
//                             )}
//                         </p>
//                         <button onclick="window.print()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                             Download Kartu
//                         </button>
//                     </div>
//                 <div>
//             `,
//             showCloseButton: true,
//             focusConfirm: false,
//             didOpen: () => {
//                 // Menambahkan event listener untuk mencetak kartu setelah popup muncul
//                 document
//                     .querySelector("button")
//                     .addEventListener("click", function () {
//                         window.print();
//                     });
//             },
//         });
//     };

//     return (
//         <div className="container mx-auto p-4 mt-32">
//             <h2 className="text-2xl font-bold mb-4">Daftar Pasien</h2>
//             <button
//                 onClick={exportToExcel}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//                 Ekspor ke Excel
//             </button>
//             <table id="patientsTable" className="display w-full mt-4">
//                 <thead className="bg-blue-500 text-white">
//                     <tr>
//                         <th>NIK</th>
//                         <th>Nama Lengkap</th>
//                         <th>Jenis Kelamin</th>
//                         <th>Umur</th>
//                         <th>Alamat</th>
//                         <th>Poli</th>
//                         <th>Nomor Antrian</th>
//                         <th>Waktu Periksa</th>
//                         <th>Donwload Kartu</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {patients.map((patient) => (
//                         <tr key={patient.id}>
//                             <td>{patient.nik}</td>
//                             <td>{patient.nama_lengkap}</td>
//                             <td>{patient.jenis_kelamin}</td>
//                             <td className="text-center">{patient.umur}</td>
//                             <td>{patient.alamat}</td>
//                             <td>
//                                 {patient.poli
//                                     .replaceAll("_", " ")
//                                     .split(" ")
//                                     .map(
//                                         (word) =>
//                                             word.charAt(0).toUpperCase() +
//                                             word.slice(1)
//                                     )
//                                     .join(" ")
//                                     .replace("D", "d")}
//                             </td>
//                             <td className="text-center">
//                                 {patient.nomor_antrian}
//                             </td>
//                             <td>
//                                 <div>
//                                     <span className="block">
//                                         {new Date(
//                                             patient.waktu_periksa
//                                         ).toLocaleDateString("id-ID", {
//                                             year: "numeric",
//                                             month: "2-digit",
//                                             day: "2-digit",
//                                         })}
//                                     </span>
//                                     <span className="block">
//                                         {new Date(
//                                             patient.waktu_periksa
//                                         ).toLocaleTimeString("id-ID", {
//                                             hour: "2-digit",
//                                             minute: "2-digit",
//                                             hour12: false,
//                                         })}
//                                     </span>
//                                 </div>
//                             </td>
//                             <td>
//                                 <button
//                                     onClick={() => handleDownloadCard(patient)}
//                                     className="text-white hover:text-blue-700 no-underline bg-blue-600 p-2 rounded-lg"
//                                 >
//                                     Download
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

export default HistoryAddPatient;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import $ from "jquery";
// import "datatables.net-dt";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";

// const HistoryAddPatient = () => {
//     const [patients, setPatients] = useState([]);
//     const username = localStorage.getItem("username");

//     useEffect(() => {
//         // Fetch data from the backend
//         axios
//             .get("http://localhost:3000/pasien")
//             .then((response) => {
//                 // Filter data pasien berdasarkan username pendaftar
//                 const filteredPatients = response.data.filter(
//                     (patient) => patient.pendaftar === username
//                 );
//                 setPatients(filteredPatients);
//             })
//             .catch((error) => console.error("Error fetching data:", error));
//     }, [username]);

//     useEffect(() => {
//         // Initialize DataTables when data is loaded
//         if (patients.length > 0) {
//             $(document).ready(function () {
//                 $("#patientsTable").DataTable();
//             });
//         }
//     }, [patients]);

//     // Fungsi untuk mengekspor data ke Excel
//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(patients);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
//         XLSX.writeFile(workbook, "patients.xlsx");
//     };

//     return (
//         <div className="container mx-auto p-4 mt-32">
//             <h2 className="text-2xl font-bold mb-4">Daftar Pasien</h2>
//             <button
//                 onClick={exportToExcel}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//                 Ekspor ke Excel
//             </button>
//             <table id="patientsTable" className="display w-full">
//                 <thead className="bg-blue-500 text-white">
//                     <tr>
//                         <th>NIK</th>
//                         <th>Nama Lengkap</th>
//                         <th>Jenis Kelamin</th>
//                         <th>Umur</th>
//                         <th>Alamat</th>
//                         <th>Poli</th>
//                         <th>Nomor Antrian</th>
//                         <th>Waktu Periksa</th>
//                         <th>Donwload Kartu</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {patients.map((patient) => (
//                         <tr key={[patient.id]}>
//                             <td>{patient.nik}</td>
//                             <td>{patient.nama_lengkap}</td>
//                             <td>{patient.jenis_kelamin}</td>
//                             <td className="text-center">{patient.umur}</td>
//                             <td>{patient.alamat}</td>
//                             <td>
//                                 {patient.poli
//                                     .replaceAll("_", " ")
//                                     .split(" ")
//                                     .map(
//                                         (word) =>
//                                             word.charAt(0).toUpperCase() +
//                                             word.slice(1)
//                                     )
//                                     .join(" ")
//                                     .replace("D", "d")}
//                             </td>
//                             <td className="text-center">
//                                 {patient.nomor_antrian}
//                             </td>
//                             <td>
//                                 <div>
//                                     <span className="block">
//                                         {new Date(
//                                             patient.waktu_periksa
//                                         ).toLocaleDateString("id-ID", {
//                                             year: "numeric",
//                                             month: "2-digit",
//                                             day: "2-digit",
//                                         })}
//                                     </span>
//                                     <span className="block">
//                                         {new Date(
//                                             patient.waktu_periksa
//                                         ).toLocaleTimeString("id-ID", {
//                                             hour: "2-digit",
//                                             minute: "2-digit",
//                                             hour12: false,
//                                         })}
//                                     </span>
//                                 </div>
//                             </td>
//                             <td>
//                                 <Link
//                                     to={`/kartu-antrian/${patient.id}`}
//                                     className="text-white hover:text-blue-700 no-underline bg-blue-600 p-2 rounded-lg"
//                                 >
//                                     Download
//                                 </Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default HistoryAddPatient;
