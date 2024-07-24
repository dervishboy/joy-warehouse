import React from "react";
import { IndentDecrease, Truck } from "lucide-react";

export default function ActivityCard() {
    return (
        <div className="bg-gray-200 border-b border-gray-950 p-10">
            {/* <h2>Activity</h2> */}
            <div className="col-span-8">
                <h2 className="mb-4 px-2 text-xl font-semibold">Warehouse Activity</h2>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center p-4 bg-custom-jorange hover:bg-orange-500 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-custom-jhitam bg-custom-jhitam rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg>
                        </div>
                        <div>
                            <p className="mb-2 text-md font-medium text-custom-jhitam">Total Pemesanan</p>
                            <p className="text-lg font-semibold text-custom-jhitam">672 order</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-rose-500 hover:bg-rose-600 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-white bg-custom-jhitam rounded-full">
                            <IndentDecrease />
                        </div>
                        <div>
                            <p className="mb-2 text-md font-medium text-custom-jhitam">Produk on Progress</p>
                            <p className="text-lg font-semibold text-custom-jhitam">25 item</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-lime-600 hover:bg-lime-700 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-white bg-custom-jhitam rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2V22M5 9h14M19 13H5M7 17h10M7 5h10" /></svg>
                        </div>
                        <div>
                            <p className="mb-2 text-md font-medium text-custom-jhitam">Produk Selesai</p>
                            <p className="text-lg font-semibold text-custom-jhitam">400 item</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-teal-400 hover:bg-teal-500 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-white bg-custom-jhitam rounded-full">
                            <Truck />
                        </div>
                        <div>
                            <p className="mb-2 text-md font-medium text-custom-jhitam">To Be Deliver</p>
                            <p className="text-lg font-semibold text-custom-jhitam">20 item</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}