import axios from "axios";
import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";

const DownloadCard = ({ data, isRegistered }) => {
    const [patients, setPatients] = useState([]);

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

    {
        patients.map((patient) =>
            new Date(patient.waktu_periksa).toLocaleString("id-ID", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
        );
    }

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text(`Nomor Antrian: ${data.nomor_antrian}`, 10, 10);
        doc.text(
            `Poli Klinik: ${data.poli
                .replaceAll("_", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}`,
            10,
            20
        );
        doc.text(`Nama: ${data.nama_lengkap}`, 10, 30);
        doc.text(`Alamat: ${data.alamat}`, 10, 40);
        doc.text(`Umur: ${data.umur}`, 10, 50);
        doc.text(
            `Waktu Periksa: ${
                patients.length > 0
                    ? new Date(patients[0].waktu_periksa).toLocaleString(
                          "id-ID",
                          {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                          }
                      )
                    : "Data tidak tersedia"
            }`,
            10,
            60
        );

        // Unduh PDF
        doc.save("antrian_pasien.pdf");
    };

    return (
        <div
            className={`p-4 border rounded-md shadow-md ${
                isRegistered ? "bg-green-100" : "bg-gray-100"
            }`}
        >
            <h3 className="text-xl font-semibold">
                Nomor Antrian: {data.nomor_antrian}
            </h3>
            <p>
                Poli Klinik:{" "}
                {data.poli
                    .replaceAll("_", " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </p>
            <p>Nama: {data.nama_lengkap}</p>
            <p>Alamat: {data.alamat}</p>
            <p>Umur: {data.umur}</p>
            <p>
                Waktu Periksa:{" "}
                {data.waktu_periksa
                    ? new Date(data.waktu_periksa).toLocaleString("id-ID", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                      })
                    : "Data tidak tersedia"}
            </p>

            <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
                Download PDF
            </button>
        </div>
    );
};

export default DownloadCard;
