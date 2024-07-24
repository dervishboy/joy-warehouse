"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Paper, Button, Typography } from '@mui/material';
import { ArrowLeftCircle } from 'lucide-react';

export default function Detail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const orderDetails = {
        kode_pesanan: 'PSN001',
        id_produk: 'PRD001',
        nama_produk: 'Kaos',
        deskripsi_produk: 'Kaos berwarna putih',
        quantity: '10',
        estimasi_waktu_pengerjaan: '2 hari',
        total_harga: 'Rp. 100.000',
        status_id: 'Dalam Proses'
    };

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <Button
                            className="bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold"
                            variant="outlined"
                            size="small"
                            startIcon={<ArrowLeftCircle />}
                            onClick={() => router.back()}
                        >
                            Kembali
                        </Button>
                        <h2 className="text-2xl font-semibold ml-4">Detail Pesanan</h2>
                    </div>
                </div>
                <Paper className="p-4">
                    <Typography variant="h6" className="mb-4">
                        Kode Pesanan: {orderDetails.kode_pesanan}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        ID Produk: {orderDetails.id_produk}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        Nama Produk: {orderDetails.nama_produk}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        Deskripsi Produk: {orderDetails.deskripsi_produk}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        Quantity: {orderDetails.quantity}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        Estimasi Waktu Pengerjaan: {orderDetails.estimasi_waktu_pengerjaan}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        Total Harga: {orderDetails.total_harga}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        Status: {orderDetails.status_id}
                    </Typography>
                </Paper>
            </div>
        </div>
    );
}
