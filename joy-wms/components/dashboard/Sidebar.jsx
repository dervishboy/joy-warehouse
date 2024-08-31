import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Home, CircleUser, ShoppingCart, Component, FolderOpen, Bolt, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('/dashboard');

    const materialLinks = [
        { name: "Data Material", href: "/dashboard/Materials" },
        { name: "Material Masuk", href: "/dashboard/Materials/masuk" },
        { name: "Material Keluar", href: "/dashboard/Materials/keluar" },
    ];

    const handleCollapsibleChange = () => {
        setIsCollapsibleOpen((prev) => {
            if (!isOpen && !prev) {
                toggleSidebar();
            }
            return !prev;
        });
    };

    const handleMenuItemClick = (href) => {
        setActiveMenuItem(href);
    };

    return (
        <div className={`min-h-screen z-50 bg-custom-jhitam text-custom-jputih shadow-lg fixed transition-all duration-300 ${isOpen ? 'w-60' : 'w-20'}`}>
            <div className="flex flex-col">
                <Link className="bg-custom-jhitam flex space-x-2 items-center px-4 py-6" href="/dashboard" onClick={() => handleMenuItemClick('/dashboard')}>
                    <Image src="/Logo.png" width={30} height={30} />
                    {isOpen && <span className="text-custom-jputih text-xl font-semibold">Joy WMS</span>}
                </Link>
            </div>
            <nav className="flex flex-col gap-4 px-3 py-6">
                <Link
                    className={`flex items-center space-x-2 rounded-lg p-2 ${activeMenuItem === '/dashboard' ? 'bg-slate-950' : ''}`}
                    href="/dashboard"
                    onClick={() => handleMenuItemClick('/dashboard')}
                >
                    <Home className="w-4 h-4" />
                    {isOpen && <span className="text-md font-semibold">Dashboard</span>}
                </Link>
                <Link
                    className={`p-2 flex items-center space-x-2 ${activeMenuItem === '/dashboard/Users' ? 'bg-slate-950' : ''}`}
                    href="/dashboard/Users"
                    onClick={() => handleMenuItemClick('/dashboard/Users')}
                >
                    <CircleUser className="w-4 h-4" />
                    {isOpen && <span className="text-md font-semibold">Users</span>}
                </Link>
                <Link
                    className={`p-2 flex items-center space-x-2 ${activeMenuItem === '/dashboard/Pesanan' ? 'bg-slate-950' : ''}`}
                    href="/dashboard/Pesanan"
                    onClick={() => handleMenuItemClick('/dashboard/Pesanan')}
                >
                    <ShoppingCart className="w-4 h-4" />
                    {isOpen && <span className="text-md font-semibold">Pesanan</span>}
                </Link>
                <Link
                    className={`p-2 flex items-center space-x-2 ${activeMenuItem === '/dashboard/Produk' ? 'bg-slate-950' : ''}`}
                    href="/dashboard/Produk"
                    onClick={() => handleMenuItemClick('/dashboard/Produk')}
                >
                    <Component className="w-4 h-4" />
                    {isOpen && <span className="text-md font-semibold">Produk</span>}
                </Link>
                <Link
                    className={`p-2 flex items-center space-x-2 ${activeMenuItem === '/dashboard/Inventaris' ? 'bg-slate-950' : ''}`}
                    href="/dashboard/Inventaris"
                    onClick={() => handleMenuItemClick('/dashboard/Inventaris')}
                >
                    <FolderOpen className="w-4 h-4" />
                    {isOpen && <span className="text-md font-semibold">Inventaris</span>}
                </Link>
                <Collapsible open={isCollapsibleOpen} onOpenChange={handleCollapsibleChange}>
                    <CollapsibleTrigger className="flex justify-between items-center w-full cursor-pointer">
                        <div className="p-2 flex items-center space-x-2">
                            <Bolt className="w-4 h-4" />
                            {isOpen && <span className="text-md font-semibold">Material</span>}
                        </div>
                        {isOpen && <ChevronRight className="w-4 h-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        {materialLinks.map((item, i) => (
                            <Link
                                key={i}
                                className={`flex items-center justify-between pl-8 pr-4 hover:bg-slate-900 transition-all duration-300 py-2 rounded-md ${activeMenuItem === item.href ? 'bg-slate-950' : 'bg-transparent'}`}
                                href={item.href}
                                onClick={() => handleMenuItemClick(item.href)}
                            >
                                {isOpen && <span className="text-sm font-semibold">{item.name}</span>}
                                {isOpen && <PlusCircle className="w-4 h-4" />}
                            </Link>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </nav>
            <div className="absolute bottom-0 right-0  w-full">
                <button className="flex items-center justify-center px-2 py-3 w-full" onClick={toggleSidebar}>
                    {isOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>
        </div>
    );
}
