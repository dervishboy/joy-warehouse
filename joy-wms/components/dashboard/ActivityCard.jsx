"use client";

import React, { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import axios from "axios";

export default function ActivityCard() {

    const [activityData, setActivityData] = useState({});

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

                const processing = orders.filter(order => order.status === 'PROCESSING').length;
                const done = orders.filter(order => order.status === 'DONE').length;
                const cancelled = orders.filter(order => order.status === 'CANCELLED').length;

                setActivityData({
                    processing,
                    done,
                    cancelled,
                });

                console.log('Activity Data', activityData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="p-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="flex items-center p-4  border-2 border-gray-500 bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-yellow-500 text-white rounded-full">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">PROCESSING</p>
                    <p className="text-lg font-semibold text-gray-900">{activityData.processing} Order</p>
                </div>
            </div>
            <div className="flex items-center p-4 border-2 border-gray-500 bg-green-200 hover:bg-green-300 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-green-500 text-white rounded-full">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">DONE</p>
                    <p className="text-lg font-semibold text-gray-900">{activityData.done} Order</p>
                </div>
            </div>
            <div className="flex items-center p-4 border-2 border-gray-500 bg-red-200 hover:bg-red-300 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-red-500 text-white rounded-full">
                    <XCircle size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">CANCELLED</p>
                    <p className="text-lg font-semibold text-gray-900">{activityData.cancelled} Order</p>
                </div>
            </div>
        </div>
    );
}
