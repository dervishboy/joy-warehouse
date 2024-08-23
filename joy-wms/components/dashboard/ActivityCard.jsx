import React from "react";
import { Clock, CheckCircle, XCircle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function ActivityCard() {
    return (
        <div className="p-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="flex items-center p-4  border-2 border-gray-500 bg-yellow-100 hover:bg-yellow-200 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-yellow-500 text-white rounded-full">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">PENDING</p>
                    <p className="text-lg font-semibold text-gray-900">3 Order</p>
                </div>
            </div>
            <div className="flex items-center p-4 border-2 border-gray-500 bg-green-200 hover:bg-green-300 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-green-500 text-white rounded-full">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">DONE</p>
                    <p className="text-lg font-semibold text-gray-900">0 Order</p>
                </div>
            </div>
            <div className="flex items-center p-4 border-2 border-gray-500 bg-red-200 hover:bg-red-300 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-red-500 text-white rounded-full">
                    <XCircle size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">CANCELLED</p>
                    <p className="text-lg font-semibold text-gray-900">0 Order</p>
                </div>
            </div>
            {/* <div className="flex items-center p-4 border-2 border-gray-500 bg-blue-200 hover:bg-blue-300 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-blue-500 text-white rounded-full">
                    <ArrowDownCircle size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">TOTAL STOK MASUK</p>
                    <p className="text-lg font-semibold text-gray-900">24 </p>
                </div>
            </div>
            <div className="flex items-center p-4 border-2 border-gray-500 bg-orange-200 hover:bg-orange-300 rounded-lg shadow-xs cursor-pointer">
                <div className="p-3 mr-4 bg-orange-500 text-white rounded-full">
                    <ArrowUpCircle size={24} />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-800">TOTAL STOK KELUAR</p>
                    <p className="text-lg font-semibold text-gray-900">24 Order</p>
                </div>
            </div> */}
        </div>
    );
}
