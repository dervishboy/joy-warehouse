"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Typography } from "@mui/material";

const pesanan = [
    { id: 1, kode_pesanan: 'PSN-001', qty: 1, total_harga: 100000, status: 'Pending', id_produk: 1, nama_produk: 'Produk A', deskripsi_produk: 'Deskripsi Produk A', estimasi_waktu_pengerjaan: '2 hari' },
    { id: 2, kode_pesanan: 'PSN-002', qty: 2, total_harga: 200000, status: 'Done', id_produk: 2, nama_produk: 'Produk B', deskripsi_produk: 'Deskripsi Produk B', estimasi_waktu_pengerjaan: '3 hari' },
];

export default function DetailPesanan() {
    const router = useRouter();
    // // const { id } = router.query;
    // const pesanan = dummyData.find((item) => item.id === parseInt(id));

    // if (!pesanan) {
    //     return <Typography>Pesanan not found</Typography>;
    // }

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Detail Pesanan</h2>
                <Typography><strong>Kode Pesanan:</strong> {pesanan.kode_pesanan}</Typography>
                <Typography><strong>ID Produk:</strong> {pesanan.id_produk}</Typography>
                <Typography><strong>Nama Produk:</strong> {pesanan.nama_produk}</Typography>
                <Typography><strong>Deskripsi Produk:</strong> {pesanan.deskripsi_produk}</Typography>
                <Typography><strong>Quantity:</strong> {pesanan.qty}</Typography>
                <Typography><strong>Estimasi Waktu Pengerjaan:</strong> {pesanan.estimasi_waktu_pengerjaan}</Typography>
                <Typography><strong>Total Harga:</strong> {pesanan.total_harga}</Typography>
                <Typography><strong>Status:</strong> {pesanan.status}</Typography>
            </Paper>
        </div>
    );
}
