import QueueList from "../fragments/QueueList";
import BackgroundHomePage from "../assets/copy-space-medical-workspace.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div
            className="h-screen w-screen flex flex-col items-center relative"
            style={{
                backgroundImage: `url(${BackgroundHomePage})`,
                backgroundSize: `cover`,
            }}
        >
            <div className=" pb-10">
                <QueueList colorTitle="text-center bg-white rounded-b-lg p-2 w-2/3 m-auto"/>
            </div>
            <div className="w-1/2">
                <h1 className="font-bold underline underline-offset-8 text-center mb-6">Welcome to Ankeslang</h1>
                <p className="text-justify font-semibold text-slate-600">ANKESLANG (Antri Puskesmas Pamulang) hadir sebagai solusi modern yang membuat kunjungan ke puskesmas lebih cepat, mudah, dan nyaman! Kini, Anda bisa mengambil nomor antrean online tanpa harus datang langsung dan menunggu lama di lokasi. Cukup dengan beberapa klik, nomor antrean Anda aman di tangan, dan Anda bisa melihat riwayat kunjungan kapan saja langsung dari platform kami. </p>
                {/* <p className="text-justify font-semibold text-slate-600">Datanglah ke puskesmas sesuai waktu pemeriksaan Anda — tanpa antre, tanpa ribet! Dengan ANKESLANG, nikmati kemudahan layanan kesehatan yang praktis dan tanpa antrian panjang. Ambil antrean sekarang, dan rasakan pengalaman baru dalam layanan kesehatan di Puskesmas Pamulang!</p> */}
            </div>
            <div className=" absolute bg-white p-4 rounded-bl-xl right-0 top-0 flex gap-2 font-semibold">
                <button className="bg-blue-600 rounded-xl px-8 py-2">
                    <Link to="/login" className="text-white no-underline">Login</Link>
                </button>
                <button className="bg-green-600 rounded-xl px-8 py-2">
                    <Link to="/register" className="text-white no-underline">Register</Link>
                </button>
            </div>
        </div>
    );
};

export default HomePage;
