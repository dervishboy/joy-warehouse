"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [formattedTitle, setFormattedTitle] = useState("");
    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getTitle = (paths) => {
        const subPage = ["tambah"];
        const subPageDetail = ["edit", "detail"];
        let title = "";
        if (subPage.includes(paths[paths.length - 1])) {
            title = paths[paths.length - 2];
        } else if (subPageDetail.includes(paths[paths.length - 1])) {
            title = paths[paths.length - 3];
        } else {
            title = paths[paths.length - 1];
        }
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    useEffect(() => {
        const paths = pathname.split("/");
        const title = getTitle(paths);
        setFormattedTitle(title);
    }, [pathname]);

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <main className={`transition-all duration-300 ${isOpen ? 'ml-60' : 'ml-20'} w-full bg-slate-200 min-h-screen`}>
                <Header title={formattedTitle} />
                {children}
            </main>
        </div>
    );
}
