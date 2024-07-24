import React from "react";
import { UserRound } from "lucide-react";

export default function Header() {
    return (
        <div className="bg-custom-jputih h-16 flex items-center justify-between px-8 border-b border-slate-300 shadow-xl sticky top-0 z-10">
            <div className="flex">
                {/* Title Page */}
                <h1 className="texl-2xl font-semibold">Page | Dashboard</h1>
                {/* Search */}
            </div>
            <div className="flex">
                <button className="flex items-center">
                    <UserRound />
                </button>
            </div>
        </div>
    );
}