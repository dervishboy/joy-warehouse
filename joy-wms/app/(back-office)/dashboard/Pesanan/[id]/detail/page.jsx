"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container, Grid, Paper, Typography, Box, Divider } from "@mui/material";

export default function LihatDetailPesanan() {
    const [orderDetails, setOrderDetails] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        // Fetch order details by id and set state
        const fetchOrder = async () => {
            // Mock API call
            const order = {
                nama_pemesan: 'John Doe',
                kode_pesanan: 'ORD001',
                estimatedTime: '2023-08-01',
                status: 'PENDING',
                products: [
                    {
                        kode_produk: 'PROD001',
                        nama_produk: 'Product A',
                        deskripsi: 'Description A',
                        materials: [
                            { nama_material: 'Akrilik', quantity: '10', satuan: 'Lembar' },
                            { nama_material: 'Kabel', quantity: '20', satuan: 'Meter' }
                        ]
                    },
                    {
                        kode_produk: 'PROD002',
                        nama_produk: 'Product B',
                        deskripsi: 'Description B',
                        materials: [
                            { nama_material: 'Lampu', quantity: '5', satuan: 'Pcs' }
                        ]
                    }
                ]
            };
            setOrderDetails(order);
        };

        fetchOrder();
    }, [id]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <Container className='px-3 py-4'>
            <Paper className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Detail Pesanan</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography>Nama Pemesan:</Typography>
                        <Typography>{orderDetails.nama_pemesan}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Kode Pesanan:</Typography>
                        <Typography>{orderDetails.kode_pesanan}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Estimasi Penyelesaian:</Typography>
                        <Typography>{orderDetails.estimatedTime}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div>
                            <h4 className='mb-1'>Status:</h4>
                            <span className='bg-yellow-400 rounded-md p-1 border border-neutral-800 text-sm font-semibold'>
                                {orderDetails.status}
                            </span>
                        </div>
                    </Grid>
                </Grid>
                {orderDetails.products.map((product, index) => (
                    <Box key={index} mt={3} mb={3}>
                        <Paper elevation={3} className="p-4 mb-4">
                            <Typography variant="h5" className='font-bold mb-2'>Product {index + 1}</Typography>
                            <Divider className='mb-3' />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Kode Produk:</Typography>
                                    <Typography>{product.kode_produk}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Nama Produk:</Typography>
                                    <Typography>{product.nama_produk}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Deskripsi Produk:</Typography>
                                    <Typography>{product.deskripsi}</Typography>
                                </Grid>
                            </Grid>
                            <Box mt={3}>
                                <Typography className='mb-2'>Materials</Typography>
                                <Grid container spacing={3}>
                                    {product.materials.map((material, materialIndex) => (
                                        <Grid item xs={12} sm={4} key={materialIndex}>
                                            <Paper elevation={1} className="p-2 mb-2">
                                                <Typography variant="body1"><strong>{material.nama_material}</strong></Typography>
                                                <Typography variant="body2">Quantity: {material.quantity} {material.satuan}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Paper>
        </Container>
    );
}
