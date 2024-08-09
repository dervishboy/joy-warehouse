import React from "react";
import { IndentDecrease } from "lucide-react";

export default function ActivityCard() {
    return (
        <div className="p-4">
            <div className="col-span-8">
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center p-4 border-2 border-custom-jhitam bg-orange-300 hover:bg-orange-500 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-custom-jhitam bg-custom-jhitam rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg>
                        </div>
                        <div>
                            <p className="text-md font-medium text-custom-jhitam">PENDING</p>
                            <p className="text-lg font-semibold text-custom-jhitam"> 24 Order </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border-2 border-custom-jhitam bg-sky-300 hover:bg-sky-500 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-white bg-custom-jhitam rounded-full">
                            <IndentDecrease />
                        </div>
                        <div>
                            <p className="text-md font-medium text-custom-jhitam">IN PROCESS</p>
                            <p className="text-lg font-semibold text-custom-jhitam"> 24 Order </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 border-2 border-custom-jhitam bg-green-300 hover:bg-green-500 rounded-lg shadow-xs mt-4 cursor-pointer">
                        <div className="p-3 mr-4 text-white bg-custom-jhitam rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2V22M5 9h14M19 13H5M7 17h10M7 5h10" /></svg>
                        </div>
                        <div>
                            <p className="text-md font-medium text-custom-jhitam">DONE</p>
                            <p className="text-lg font-semibold text-custom-jhitam">24 Order</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}