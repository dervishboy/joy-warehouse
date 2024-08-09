import ActivityCard from "@/components/dashboard/ActivityCard";
import Charts from "@/components/dashboard/Charts";
import React from "react";
import { Paper, Box } from "@mui/material";

export default function Dashboard() {
    return (
        <div className="px-4 py-4">
            <Paper className="p-4 space-y-2">
                <h2 className="text-2xl font-semibold mb-4">Selamat Datang !!!</h2>
                <Box sx={{ border: '2px solid gray' }}>
                    <ActivityCard />
                </Box>
                <Box sx={{ border: '2px solid gray' }}>
                    <Charts />
                </Box>
            </Paper>
        </div>
    );
}