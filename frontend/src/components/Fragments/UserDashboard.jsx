import React, { useState } from "react";
import QueueList from "../Elements/QueueList.jsx";
import HistoryAddPatient from "./User/HistoryAddPatient.jsx";
import RegistrasiKunjungan from "./User/RegistrasiKunjungan.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faClipboardList, faHistory } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
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
                            <li className="cursor-pointer">
                                <div
                                    onClick={() => handleMenu("dashboard")}
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "dashboard"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-2"/> Dashboard
                                </div>
                            </li>
                            <li className="cursor-pointer">
                                <div
                                    onClick={() =>
                                        handleMenu("registrasi-kunjungan")
                                    }
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "registrasi-kunjungan"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faClipboardList} className="mr-2"/> Registrasi Kunjungan
                                </div>
                            </li>
                            <li className="cursor-pointer">
                                <div
                                    onClick={() =>
                                        handleMenu("riwayat-kunjungan")
                                    }
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "riwayat-kunjungan"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faHistory} className="mr-2"/> Riwayat Kunjungan
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="w-full flex justify-center">
                {menu === "dashboard" && (
                    <div  className="p-4 mt-36">
                        <QueueList />
                    </div>
                )}
                {menu === "registrasi-kunjungan" && <RegistrasiKunjungan />}
                {menu === "riwayat-kunjungan" && <HistoryAddPatient />}
            </div>
        </div>
    );
};

export default UserDashboard;
