import React, { useState, useEffect } from "react";
import AntriPoli from "../fragments/AntriPoli";

const HomePage = () => {
    return (
        <div className="w-screen">
            <div className="p-4 border flex justify-center w-screen">
                <AntriPoli />
            </div>
        </div>
    );
};

export default HomePage;
