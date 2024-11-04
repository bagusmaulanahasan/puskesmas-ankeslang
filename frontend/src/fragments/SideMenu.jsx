import React from 'react';
import { NavLink } from 'react-router-dom';

function SideMenu() {
    return (
        <div className="w-64 mt-36 fixed h-screen fixedflex flex-col jutify-center">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Menu</h1>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <NavLink 
                            to="/dashboard" 
                            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200" 
                            activeClassName="bg-gray-700"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/daftar-kunjungan" 
                            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200" 
                            activeClassName="bg-gray-700"
                        >
                            Daftar Kunjungan
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/riwayat-kunjungan" 
                            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200" 
                            activeClassName="bg-gray-700"
                        >
                            Riwayat Kunjungan
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideMenu;
