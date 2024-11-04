import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

const QueueCard = ({ formData }) => {
    const cardRef = useRef(null);

    const downloadCard = async () => {
        if (cardRef.current) {
            const dataUrl = await toPng(cardRef.current);
            saveAs(dataUrl, 'kartu_antrian.png');
        }
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-md" ref={cardRef}>
            <h2 className="text-xl font-bold mb-2">Kartu Antrian</h2>
            <p><strong>NIK:</strong> {formData.nik}</p>
            <p><strong>Nama Lengkap:</strong> {formData.nama_lengkap}</p>
            <p><strong>Jenis Kelamin:</strong> {formData.jenis_kelamin}</p>
            <p><strong>Umur:</strong> {formData.umur}</p>
            <p><strong>Alamat:</strong> {formData.alamat}</p>
            <p><strong>Poli Klinik:</strong> {formData.poli}</p>
            <button
                onClick={downloadCard}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Download Kartu
            </button>
        </div>
    );
};

export default QueueCard;
