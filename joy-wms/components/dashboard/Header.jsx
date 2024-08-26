"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserRound } from "lucide-react";
// import axios from "axios";

export default function Header({ title }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-custom-jputih h-16 flex items-center justify-between px-8 border-b border-slate-300 shadow-xl sticky top-0 z-10">
            <div className="flex">
                {/* Title Page */}
                <h1 className="font-semibold">Page | {title}</h1>
            </div>
            <div className="relative" ref={dropdownRef}>
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
