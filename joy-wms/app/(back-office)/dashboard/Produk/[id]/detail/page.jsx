"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Paper, Grid, Typography, Box, Divider, Button } from "@mui/material";
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

export default function DetailProduk() {
    const [productDetails, setProductDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const product = {
                kode_produk: 'PROD001',
                nama_produk: 'Product A',
                deskripsi: 'Description A',
                materials: [
                    { nama_material: 'Akrilik', quantity: '10', satuan: 'Lembar' },
                    { nama_material: 'Kabel', quantity: '20', satuan: 'Meter' }
                ]
            };
            setProductDetails(product);
        };

        fetchProduct();
    }, [id]);

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4 mx-4 my-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Detail Produk</h2>
                    <Button
                        href="/dashboard/Produk"
                        startIcon={<ArrowLeftCircle />}
                        className='bg-custom-jorange hover:bg-orange-600  text-custom-jhitam font-semibold'
                        variant='contained'
                        size='small'
                    >
                        Kembali
                    </Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography className='text-sm font-semibold'>Kode Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.kode_produk}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className='text-sm font-semibold'>Nama Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.nama_produk}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className='text-sm font-semibold'>Deskripsi Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.deskripsi}</Typography>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Typography className='mb-2'>Materials</Typography>
                    <Grid container spacing={3}>
                        {productDetails.materials.map((material, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper elevation={1} className="p-2 mb-2">
                                    <Typography variant="body1"><strong>{material.nama_material}</strong></Typography>
                                    <Typography variant="body2">Quantity: {material.quantity} {material.satuan}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
}
