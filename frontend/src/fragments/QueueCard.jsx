import React, { useState, useEffect } from "react";

const QueueCard = ({id_username}) => {
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        // Fetch data from the backend
        axios
            .get("http://localhost:3000/pasien")
            .then((response) => {
                // Filter data pasien berdasarkan username pendaftar
                const filteredPatients = response.data.filter(
                    (patient) => patient.id === id_username
                );
                setPatient(filteredPatients);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id_username]);

    return (
        <div className="container mx-auto p-4 mt-10">
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
                        <tr>
                            <td>
                                Nama Lengkap : {patient.nama_lengkap}
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    );
};

export default QueueCard;
