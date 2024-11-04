import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { useLocation } from 'react-router-dom';
import PatientTable from './PatientTable.jsx';
import AntriPoli from './AntriPoli.jsx';
import AddPatient from './AddPatient.jsx';

const AdminDashboard = () => {

  const [menu, setMenu] = useState("dashboard");

  const handleMenu = (menu) => {
      setMenu(menu);
  };

  return (
    <div className="flex flex-row">
    <div className="flex items-center h-screen w-1/4">
        {/* <SideMenu></SideMenu> */}
        <div className="w-64 mt-36 fixed h-screen fixedflex flex-col jutify-center border">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Menu</h1>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li className='cursor-pointer'>
                        <div
                            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200"
                            // activeClassName="bg-gray-700"
                            onClick={() => handleMenu("dashboard")}
                        >
                            Dashboard
                        </div>
                    </li>
                    <li className='cursor-pointer'>
                        <div
                            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200"
                            // activeClassName="bg-gray-700"
                            onClick={() =>
                                handleMenu("registrasi-kunjungan")
                            }
                        >
                            Daftar Kunjungan
                        </div>
                    </li>
                    <li className='cursor-pointer'>
                        <div
                            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200"
                            // activeClassName="bg-gray-700"
                            onClick={() =>
                                handleMenu("daftar-pasien")
                            }
                        >
                            Daftar Pasien
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <div className="p-4 w-1/2">
        {menu === "dashboard" && <AntriPoli />}
        {menu === "registrasi-kunjungan" && <AddPatient />}
        {menu === "daftar-pasien" && <PatientTable />}
    </div>
</div>
  );
};

export default AdminDashboard;
