import React, { useState } from "react";
import { UserRound } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

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
                <h1 className="font-semibold">Page | Dashboard</h1>
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
