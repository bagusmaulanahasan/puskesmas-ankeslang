import React, { useState } from "react";
import PatientTable from "./Admin/PatientTable.jsx";
// import AddPatient from ".Admin/AddPatient.jsx";
import UsersData from "./Admin/UsersData.jsx";
import HistoryDeleteUsers from "./Admin/HistoryDeleteUsers.jsx";
import HistoryDeletePasien from "./Admin/HistoryDeletePasien.jsx";
import QueueList from "../Elements/QueueList.jsx";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUser, faHistory, faUserSlash } from '@fortawesome/free-solid-svg-icons';

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
                            {/* <li className="cursor-pointer">
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
                                    Registrasi Kunjungan
                                </div>
                            </li> */}
                            <li className="cursor-pointer">
                                <div
                                    onClick={() => handleMenu("data-pasien")}
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "data-pasien"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faUsers} className="mr-2"/> Data Pasien
                                </div>
                            </li>
                            <li className="cursor-pointer">
                                <div
                                    onClick={() => handleMenu("data-users")}
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "data-users"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2"/> Data Users
                                </div>
                            </li>
                            
                            <li className="cursor-pointer">
                                <div
                                    onClick={() => handleMenu("history-delete-pasien")}
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "history-delete-pasien"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faHistory} className="mr-2"/> History Delete Pasien
                                </div>
                            </li>
                            <li className="cursor-pointer">
                                <div
                                    onClick={() => handleMenu("history-delete-users")}
                                    className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-200 ${
                                        menu === "history-delete-users"
                                            ? "bg-slate-200"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faUserSlash} className="mr-2"/> History Delete Users
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {menu === "dashboard" && (
                    <div  className="p-4 mt-36">
                        <QueueList />
                    </div>
                )}
            {/* {menu === "registrasi-kunjungan" && <AddPatient />} */}
            {menu === "data-pasien" && <PatientTable />}
            {menu === "data-users" && <UsersData />}
            {menu === "history-delete-users" && <HistoryDeleteUsers />}
            {menu === "history-delete-pasien" && <HistoryDeletePasien />}
        </div>
    );
};

export default AdminDashboard;
