"use client"

import React, { useState } from "react";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const getTitle = () => {
        const path = router.pathname;
        switch (path) {
            case "/dashboard":
                return "Dashboard";
            case "/dashboard/Materials":
                return "Materials";
            case "/dashboard/Materials/tambah":
                return "Tambah Material";
            case "/dashboard/Materials/keluar":
                return "Materials Keluar";
            case "/dashboard/Materials/keluar/tambah":
                return "Tambah Material Keluar";
            case "/dashboard/Users":
                return "Users";
            case "/dashboard/Users/tambah":
                return "Tambah User";
            case "/dashboard/Users/[id]/edit":
                return "Edit User";
            case "/dashboard/Materials/[id]/edit":
                return "Edit Material";
            default:
                return "Page";
        }
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        console.log('Logout');
        setIsOpen(false);
    }

    return (
        <div className="bg-custom-jputih h-16 flex items-center justify-between px-8 border-b border-slate-300 shadow-xl sticky top-0 z-10">
            <div className="flex">
                {/* Title Page */}
                <h1 className="font-semibold">Page | {getTitle()}</h1>
            </div>
            <div className="relative">
                <button onClick={handleToggle} className="flex items-center focus:outline-none">
                    <UserRound />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
                        <button 
                            onClick={handleLogout} 
                            className="w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
