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
                        backgroundColor: "rgba(255, 165, 0, 0.5)", // Orange color
                        borderColor: "rgba(255, 165, 0, 1)",
                        data: [30, 50, 40, 60, 70, 55, 45],
                        fill: false,
                    },
                    {
                        label: "In Process",
                        backgroundColor: "rgba(0, 123, 255, 0.5)", // Blue color
                        borderColor: "rgba(0, 123, 255, 1)",
                        data: [20, 40, 45, 55, 60, 70, 80],
                        fill: false,
                    },
                    {
                        label: "Done",
                        backgroundColor: "rgba(40, 167, 69, 0.5)", // Green color
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
                    text: "Order Status",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
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
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
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
            <h2 className="text-xl font-semibold">Charts</h2>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                                Overview
                            </h6>
                            <h2 className="text-white text-xl font-semibold">Order Status</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}
