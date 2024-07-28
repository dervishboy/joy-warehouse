import ActivityCard from "@/components/dashboard/ActivityCard";
import Charts from "@/components/dashboard/Charts";
import React from "react";

export default function Dashboard() {
    return (
        <div className="px-4 py-4">
            <div className="mb-4 p-2">
                <h2 className="text-xl font-semibold">Selamat Datang!</h2>
            </div>
            <ActivityCard />
            <Charts />
        </div>
    );
}