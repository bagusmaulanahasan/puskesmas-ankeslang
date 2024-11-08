import QueueList from "../fragments/QueueList";
import BackgroundHomePage from "../assets/copy-space-medical-workspace.jpg";

const HomePage = () => {
    return (
        <div
            className="h-screen w-screen flex flex-col items-center"
            style={{
                backgroundImage: `url(${BackgroundHomePage})`,
                backgroundSize: `cover`,
            }}
        >
            <div className="w-2/3 pb-10">
                <QueueList colorTitle="text-center bg-white rounded-b-lg p-2"/>
            </div>
            <div className="p-6 rounded-xl w-1/2">
                <h1 className="font-bold underline underline-offset-8 text-center mb-6">Welcome to Ankeslang</h1>
                <p className="text-justify font-semibold text-slate-600">ANKESLANG (Antri Puskesmas Pamulang) hadir sebagai solusi modern yang membuat kunjungan ke puskesmas lebih cepat, mudah, dan nyaman! Kini, Anda bisa mengambil nomor antrean online tanpa harus datang langsung dan menunggu lama di lokasi. Cukup dengan beberapa klik, nomor antrean Anda aman di tangan, dan Anda bisa melihat riwayat kunjungan kapan saja langsung dari platform kami. </p>
                <p className="text-justify font-semibold text-slate-600">Datanglah ke puskesmas sesuai waktu pemeriksaan Anda — tanpa antre, tanpa ribet! Dengan ANKESLANG, nikmati kemudahan layanan kesehatan yang praktis dan tanpa antrian panjang. Ambil antrean sekarang, dan rasakan pengalaman baru dalam layanan kesehatan di Puskesmas Pamulang!</p>
            </div>
        </div>
    );
};

export default HomePage;
