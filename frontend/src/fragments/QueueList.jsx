import React, { useState, useEffect } from "react";
import axios from "axios";

const QueueList = ({ colorTitle }) => {
    const [queues, setQueues] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data untuk semua poli
    const fetchQueueData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/waktu-periksa"
            ); // Mengambil data dari endpoint baru yang mengembalikan data untuk semua poli
            const data = response.data;

            setQueues(data); // Menyimpan data untuk ditampilkan
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch queue data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueueData();
    }, []); // Fetch data sekali saat komponen pertama kali dimuat

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className={`text-2xl font-bold mb-4 ${colorTitle}`}>
                Informasi Antrian Saat Ini
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {queues.map((queue, index) => (
                    <div
                        key={index}
                        className={`p-8 px-10 rounded shadow-md text-center ${
                            queue.poli === "umum"
                                ? "bg-red-200"
                                : queue.poli === "ibu_dan_anak"
                                ? "bg-pink-200"
                                : queue.poli === "gigi_dan_mulut"
                                ? "bg-blue-200"
                                : "bg-indigo-200"
                        }`}
                    >
                        <h3 className="text-xl font-semibold">
                            {queue.poli
                                .replaceAll("_", " ")
                                .split(" ")
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                )
                                .join(" ")
                                .replace("D", "d")}
                        </h3>
                        <hr />
                        <p className="text-6xl">{queue.nomor_antrian}</p>
                        <p>Nomor Antrian Terbaru </p>
                        <hr />
                        <p className="text-4xl">
                            {new Date(queue.waktu_periksa).toLocaleTimeString(
                                "id-ID",
                                {
                                    hour12: false,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </p>
                        <p>Waktu Periksa Terbaru</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueueList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const QueueList = ({colorTitle}) => {
//     const [queues, setQueues] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchQueueData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/pasien');
//                 const data = response.data;

//                 // Mengelompokkan nomor antrian berdasarkan poli dan mengambil nomor antrian terbaru untuk setiap poli
//                 const latestQueues = data.reduce((acc, curr) => {
//                     if (!acc[curr.poli] || acc[curr.poli].nomor_antrian < curr.nomor_antrian) {
//                         acc[curr.poli] = curr;
//                     }
//                     return acc;
//                 }, {});

//                 setQueues(Object.values(latestQueues));
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Failed to fetch queue data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchQueueData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2 className={`text-2xl font-bold mb-4 ${colorTitle}`}>Informasi Antrian Saat Ini</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* {queues.map((queue, index) => (
//                     <div key={index} className="p-4 border rounded shadow-md">
//                         <h3 className="text-xl font-semibold">{queue.poli}</h3>
//                         <p className="text-lg">Nomor Antrian Terbaru: {queue.nomor_antrian}</p>
//                     </div>
//                 ))} */}
//                 {queues.map((queue, index) => (
//                     <div
//                         key={index}
//                         className={`p-4 border rounded shadow-md text-center ${
//                             queue.poli === "umum"
//                                 ? "bg-red-200"
//                                 : queue.poli === "ibu_dan_anak"
//                                 ? "bg-pink-200"
//                                 : queue.poli === "gigi_dan_mulut"
//                                 ? "bg-blue-200"
//                                 : "bg-indigo-200"
//                         }`}
//                     >
//                         <h3 className="text-xl font-semibold">{queue.poli.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('D', 'd')}</h3>
//                         <hr />
//                         <p className="text-lg">Nomor Antrian Terbaru: {queue.nomor_antrian}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default QueueList;
