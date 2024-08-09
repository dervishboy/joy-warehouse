"use client";

import React, { useEffect } from "react";
import Chart from "chart.js";

export default function Charts() {
    useEffect(() => {
        var config = {
            type: "line",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Pending",
                        backgroundColor: "rgba(255, 165, 0, 0.5)",
                        borderColor: "rgba(255, 165, 0, 1)",
                        data: [30, 50, 40, 60, 70, 55, 45],
                        fill: false,
                    },
                    {
                        label: "In Process",
                        backgroundColor: "rgba(0, 123, 255, 0.5)",
                        borderColor: "rgba(0, 123, 255, 1)",
                        data: [20, 40, 45, 55, 60, 70, 80],
                        fill: false,
                    },
                    {
                        label: "Done",
                        backgroundColor: "rgba(40, 167, 69, 0.5)",
                        borderColor: "rgba(40, 167, 69, 1)",
                        data: [10, 30, 35, 50, 65, 75, 90],
                        fill: false,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                },
                legend: {
                    labels: {
                        fontColor: "black",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "black",
                            },
                            display: true,
                            gridLines: {
                                display: false,
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "black",
                            },
                            display: true,
                            gridLines: {
                                borderDash: [3],
                                color: "rgba(33, 37, 41, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                            },
                        },
                    ],
                },
            },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }, []);

    return (
        <div className="p-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-custom-jputih">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-black text-md font-semibold">Order Status</h2> 
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative h-200-px">
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}
