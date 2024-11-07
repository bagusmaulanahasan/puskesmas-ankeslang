import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import DownloadCard from "./DownloadCard";

function RegistrasiKunjungan() {
    // ambil data username dari localStorage
    const username = localStorage.getItem("username");

    // ambil data pasien berdasarkan username
    const [patientData, setPatientData] = useState(null);

    // State untuk form data
    const [formData, setFormData] = useState({
        nik: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        umur: "",
        alamat: "",
        poli: "umum",
        pendaftar: username,
    });

    const [isRegistrationComplete, setRegistrationComplete] = useState(false); // Menambahkan state untuk melacak status registrasi

    useEffect(() => {
        // Fetch data dari backend menggunakan endpoint yang sudah disiapkan
        axios
            .get(`http://localhost:3000/users/${username}`)
            .then((response) => {
                // Filter data pasien berdasarkan pendaftar
                setPatientData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [username]); // Hanya berjalan saat username berubah

    // Mengatur form data setelah pasien data diterima
    useEffect(() => {
        if (patientData) {
            setFormData({
                nik: patientData.nik,
                nama_lengkap: patientData.nama_lengkap,
                jenis_kelamin: patientData.jenis_kelamin,
                umur: patientData.umur,
                alamat: patientData.alamat,
                poli: "umum",
                pendaftar: username,
            });
        }
    }, [patientData]);

    // alert succes
    const showSuccessAlert = (position, icon, title, timer) => {
        Swal.fire({
            position: position,
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: timer,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tampilkan konfirmasi dengan SweetAlert
        Swal.fire({
            title: "Konfirmasi Registrasi",
            text: "Apakah Anda yakin ingin melakukan registrasi kunjungan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            // cancelButtonColor: "bg-gray-400",
            confirmButtonText: "Ya, Daftar",
            cancelButtonText: "Batal",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Lakukan registrasi jika pengguna mengonfirmasi
                    const response = await axios.post(
                        "http://localhost:3000/pasien",
                        formData
                    );
                    console.log(response);

                    // Tampilkan alert sukses
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Berhasil daftar",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    setRegistrationComplete(true); // Set registration complete to true
                    e.target.reset();
                } catch (error) {
                    console.error(error);
                    // Tampilkan alert error
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Terjadi kesalahan saat menyimpan data. Silahkan coba lagi.",
                    });
                }
            }
        });
    };

    // if (!patientData) {
    //     return <div>Loading patient data...</div>;
    // }

    return (
        <div className="w-1/2 mt-28">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-20 border border-gray-300 rounded-md p-8"
            >
                {/* Field Poli */}
                <h2 className="text-2xl font-bold mb-4">
                    Registrasi Kunjungan Pasien
                </h2>
                <div className="flex flex-col">
                    <label htmlFor="poli" className="font-medium">
                        Poli klinik<span className="text-red-500">*</span>
                    </label>
                    <select
                        id="poli"
                        name="poli"
                        value={formData.poli}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 mt-2"
                    >
                        <option value="umum">Umum</option>
                        <option value="ibu_dan_anak">Ibu dan Anak</option>
                        <option value="gigi_dan_mulut">Gigi dan Mulut</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Registrasi
                </button>
            </form>

            {/* Menampilkan DownloadCard jika registrasi berhasil
            {isRegistrationComplete && patientData && (
                <DownloadCard data={formData} isRegistered={isRegistrationComplete} />
            )} */}
        </div>
    );
}

export default RegistrasiKunjungan;

// import Swal from "sweetalert2";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function DaftarAntrian() {
//     // ambil data username dari localStorage
//     const username = localStorage.getItem("username");

//     // ambil data pasien berdasarkan username
//     const [patientData, setPatientData] = useState(null);

//     // State untuk form data
//     const [formData, setFormData] = useState({
//         nik: "",
//         nama_lengkap: "",
//         jenis_kelamin: "",
//         umur: "",
//         alamat: "",
//         poli: "umum",
//         pendaftar: username,
//     });

//     useEffect(() => {
//         // Fetch data dari backend menggunakan endpoint yang sudah disiapkan
//         axios.get(`http://localhost:3000/users/${username}`)
//             .then((response) => {
//                 // Filter data pasien berdasarkan pendaftar
//                 setPatientData(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, [username]); // Hanya berjalan saat username berubah

//     // Mengatur form data setelah pasien data diterima
//     useEffect(() => {
//         if (patientData) {
//             setFormData({
//                 nik: patientData.nik,
//                 nama_lengkap: patientData.nama_lengkap,
//                 jenis_kelamin: patientData.jenis_kelamin,
//                 umur: patientData.umur,
//                 alamat: patientData.alamat,
//                 poli: "umum",
//                 pendaftar: username,
//             });
//         }
//     }, [patientData]);

//     // alert succes
//     const showSuccessAlert = (position, icon, title, timer) => {
//         Swal.fire({
//             position: position,
//             icon: icon,
//             title: title,
//             showConfirmButton: false,
//             timer: timer,
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log(formData); // Debug

//         try {
//             const response = await axios.post("http://localhost:3000/pasien", formData);
//             console.log(response);
//             // show allert succes
//             showSuccessAlert("top", "success", "Berhasil daftar", 2000);
//             setRegistrationComplete(true);
//             e.target.reset();
//         } catch (error) {
//             console.error(error);
//             showAlert(
//                 "error",
//                 "Error",
//                 "Terjadi kesalahan saat menyimpan data. Silahkan coba lagi.",
//                 null
//             );
//         }
//     };

//     if (!patientData) {
//         return <div>Loading patient data...</div>;
//     }

//     return (
//         <form onSubmit={handleSubmit} className=" flex flex-col gap-4 mt-20 border border-gray-300 rounded-md p-8">
//             {/* Field Poli */}
//             <div className="flex flex-col">
//                 <label htmlFor="poli" className="font-medium">
//                     Poli klinik<span className="text-red-500">*</span>
//                 </label>
//                 <select
//                     id="poli"
//                     name="poli"
//                     value={formData.poli}
//                     onChange={handleChange}
//                     className="border border-gray-300 rounded-md p-2 mt-2"
//                 >
//                     <option value="umum">Umum</option>
//                     <option value="ibu_dan_anak">Ibu dan Anak</option>
//                     <option value="gigi_dan_mulut">Gigi dan Mulut</option>
//                 </select>
//             </div>

//             <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Registrasi
//             </button>
//         </form>
//     );
// }

// export default DaftarAntrian;
