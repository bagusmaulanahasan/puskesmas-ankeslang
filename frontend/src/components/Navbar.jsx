import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role, name }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari localStorage (atau mekanisme penyimpanan lain yang Anda gunakan)
    localStorage.removeItem('token');
    // Arahkan pengguna kembali ke halaman login
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 p-4 text-white fixed w-screen z-10">
      <div className='flex items-center justify-between px-4'>
        <div className="text-2xl">Welcome, {role}!</div>
        <div className="flex items-center">
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
