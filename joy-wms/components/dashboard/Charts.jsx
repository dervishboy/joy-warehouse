"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js";

export default function Charts() {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', {
                    params: {
                        searchQuery: '',
                        page: 0,
                        rowsPerPage: 100,
                    }
                });

                const orders = response.data.orders;

                const monthlyData = orders.reduce((acc, order) => {
                    const date = new Date(order.estimatedTime);
                    const year = date.getFullYear();
                    const month = date.getMonth();

                    const key = `${year}-${month}`;

                    if (!acc[key]) {
                        acc[key] = 0;
                    }
                    acc[key] += order.totalHarga;
                    return acc;
                }, {});

                const sortedData = Object.keys(monthlyData).sort((a, b) => {
                    const [yearA, monthA] = a.split('-').map(Number);
                    const [yearB, monthB] = b.split('-').map(Number);
                    return yearA === yearB ? monthA - monthB : yearA - yearB;
                });

                const labels = sortedData.map(key => {
                    const [year, month] = key.split('-').map(Number);
                    return new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
                });

                const data = sortedData.map(key => monthlyData[key]);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Total Harga per Bulan",
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                            borderColor: "rgba(0, 123, 255, 1)",
                            data,
                            fill: false, 
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (Object.keys(chartData).length > 0) {
            const config = {
                type: "line",
                data: chartData,
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
                                    beginAtZero: true,
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
            const ctx = document.getElementById("line-chart").getContext("2d");
            new Chart(ctx, config);
        }
    }, [chartData]);

    return (
        <div className="p-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-custom-jputih">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-black text-md font-semibold">Total Harga per Bulan</h2>
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
