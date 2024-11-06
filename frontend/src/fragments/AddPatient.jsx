// components/PatientForm.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddPatient() {

    const pendaftar = localStorage.getItem("username");

    const [formData, setFormData] = useState({
        nik: "",
        nama_lengkap: "",
        jenis_kelamin: "",
        umur: "",
        alamat: "",
        poli: "umum",
        pendaftar: pendaftar,
    });

    // const [error, setError] = useState(''); // State untuk menyimpan pesan kesalahan

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const showAlert = (icon, title, text, footer) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            footer: footer,
        });
    };

    const showSuccessAlert = (position, icon, title, timer) => {
        Swal.fire({
            position: position,
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: timer,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData); // show formData on console

        // Validasi input
        if (
            !formData.nik ||
            !formData.nama_lengkap ||
            !formData.jenis_kelamin ||
            !formData.umur ||
            !formData.alamat ||
            !formData.poli
        ) {
            showAlert("error", "Oops...", "Semua data wajib diisi!", null);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/pasien",
                formData
            );
            console.log(response);
            showSuccessAlert("top", "success", "Berhasil daftar", 2000);
            // Reset form values
            setFormData({
                nik: "",
                nama_lengkap: "",
                jenis_kelamin: "",
                umur: "",
                alamat: "",
                poli: "umum",
                pendaftar: pendaftar,
            });
            e.target.reset();
            // setError('');
        } catch (error) {
            console.error(error);
            showAlert(
                "error",
                "Error",
                "Terjadi kesalahan saat menyimpan data. Silahkan coba lagi.",
                null
            );
        }
    };

    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-4 mt-36 mb-20 ml-24  border border-gray-300 rounded-md p-8 w-1/2"
        >
            {/* Field NIK */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Data Pasien</h2>
                <p className="text-sm text-gray-600 mb-8">
                    * Mohon periksa kembali data yang Anda masukkan karena data
                    ini bersifat resmi dan akan digunakan sebagai acuan dalam
                    proses pelayanan.
                </p>
                <label htmlFor="nik" className="font-medium">
                    NIK<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    onInput={handleInput}
                    pattern="\d*"
                    className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
            </div>
            {/* Field Nama Lengkap */}
            <div>
                <label htmlFor="nama_lengkap" className="font-medium">
                    Nama Lengkap<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="nama_lengkap"
                    name="nama_lengkap"
                    value={formData.nama_lengkap}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
            </div>
            {/* Field Jenis Kelamin */}
            <div>
                <label htmlFor="jenis_kelamin" className="font-medium">
                    Jenis Kelamin<span className="text-red-500">*</span>
                </label>
                <div className="flex flex-row gap-10 mt-2">
                    <div>
                        <input
                            type="radio"
                            id="laki-laki"
                            name="jenis_kelamin"
                            value="Laki-laki"
                            checked={formData.jenis_kelamin === "Laki-laki"}
                            onChange={handleChange}
                        />
                        <label htmlFor="laki-laki">Laki-laki</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="perempuan"
                            name="jenis_kelamin"
                            value="Perempuan"
                            checked={formData.jenis_kelamin === "Perempuan"}
                            onChange={handleChange}
                        />
                        <label htmlFor="perempuan">Perempuan</label>
                    </div>
                </div>
            </div>
            {/* Field Umur */}
            <div>
                <label htmlFor="umur" className="font-medium">
                    Umur<span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="umur"
                    name="umur"
                    value={formData.umur}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
            </div>
            {/* Field Alamat */}
            <div>
                <label htmlFor="alamat" className="font-medium">
                    Alamat<span className="text-red-500">*</span>
                </label>
                <textarea
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
            </div>
            {/* Field Poli */}
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
    );
}

export default AddPatient;
