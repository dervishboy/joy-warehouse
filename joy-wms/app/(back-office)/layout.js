"use client";

import React, { useState } from "react";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <main className={`transition-all duration-300 ${isOpen ? 'ml-60' : 'ml-20'} w-full bg-slate-200 min-h-screen`}>
                <Header />
                {children}
            </main>
        </div>
    );
}
