"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Grid, Paper, Typography, Box, Divider, Button, Select, MenuItem, FormControl, Snackbar, SnackbarContent } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

export default function LihatDetailPesanan() {
    const router = useRouter();
    const { id } = useParams();
    const printRef = useRef();
    const [orderDetails, setOrderDetails] = useState({
        nama_pemesan: '',
        kode_pesanan: '',
        estimatedTime: '',
        totalHarga: '',
        status: '',
        orderProducts: [
            {
                product: {
                    kode_produk: '',
                    nama_produk: '',
                    jumlah_produk: '',
                    deskripsi: '',
                    productMaterials: [
                        {
                            material: {
                                nama_material: '',
                                quantity: '',
                                satuan: '',
                            },
                        },
                    ],
                },
            },
        ],
    });
    const [newStatus, setNewStatus] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    }

    const handleUpdateStatus = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${id}/status`, {
                status: newStatus,
            });
            setOrderDetails({
                ...orderDetails,
                status: newStatus,
                totalHarga: newStatus === 'CANCELLED' ? 0 : orderDetails.totalHarga,
            });
            setSnackbarSeverity('success');
            setSnackbarMessage('Status pesanan berhasil diupdate!');
            setSnackbarOpen(true);
            setTimeout(() => {
                router.push('/dashboard/Pesanan');
            }, 2000);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Terjadi kesalahan saat mengupdate status pesanan!');
            setSnackbarOpen(true);
            console.error('Error updating order status:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Pesanan');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4" ref={printRef}>
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
                        <Typography>Estimasi Waktu Selesai:</Typography>
                        <Typography>{formatDate(orderDetails.estimatedTime)}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Total Harga:</Typography>
                        <Typography>Rp {orderDetails.totalHarga}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className='mb-4'>
                            <h4 className='mb-1'>Status:</h4>
                            <span className={`rounded-md p-1 border border-neutral-800 text-sm font-semibold ${orderDetails.status === 'PROCESSING' ? 'bg-yellow-400' :
                                orderDetails.status === 'DONE' ? 'bg-green-400' :
                                    'bg-red-400'
                                }`}>
                                {orderDetails.status}
                            </span>
                        </div>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Select
                                        variant='outlined'
                                        size='small'
                                        value={newStatus}
                                        onChange={handleStatusChange}
                                    >
                                        {/* <MenuItem value="PROCESSING">PROCESSING</MenuItem> */}
                                        <MenuItem value="DONE">DONE</MenuItem>
                                        <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant='contained'
                                    size='small'
                                    color='primary'
                                    onClick={handleUpdateStatus}
                                >
                                    Update Status
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {orderDetails.orderProducts.map((orderProduct, index) => (
                    <Box key={index} mt={3} mb={3}>
                        <Paper elevation={3} className="p-4 mb-4">
                            <Typography variant="h5" className='font-bold mb-2'>Product {index + 1}</Typography>
                            <Divider className='mb-3' />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Kode Produk:</Typography>
                                    <Typography>{orderProduct.product.kode_produk}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Nama Produk:</Typography>
                                    <Typography>{orderProduct.product.nama_produk}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>
                                        Jumlah Produk:
                                    </Typography>
                                    <Typography>
                                        {orderProduct.product.jumlah_produk}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Deskripsi Produk:</Typography>
                                    <Typography>{orderProduct.product.deskripsi}</Typography>
                                </Grid>
                            </Grid>
                            <Box mt={3}>
                                <Typography className='mb-2'>Materials</Typography>
                                <Grid container spacing={3}>
                                    {orderProduct.product.productMaterials.map((productMaterial, materialIndex) => (
                                        <Grid item xs={12} sm={4} key={materialIndex}>
                                            <Paper elevation={1} className="p-2 mb-2">
                                                <Typography variant="body1"><strong>{productMaterial.material.nama_material}</strong></Typography>
                                                <Typography variant="body2">Quantity: {productMaterial.quantity} {productMaterial.material.satuan}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                ))}
                <div className='flex justify-between'>
                    <Button
                        onClick={handleBack}
                        variant="contained"
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        className='bg-custom-jorange hover:bg-orange-500 text-custom-jhitam font-semibold'
                    >
                        Kembali
                    </Button>
                    <ReactToPrint
                        trigger={() => (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<PrintIcon />}
                                className='bg-blue-300 hover:bg-blue-500 text-custom-jhitam font-semibold'
                            >
                                Cetak / Simpan sebagai PDF
                            </Button>
                        )}
                        content={() => printRef.current}
                    />
                </div>
            </Paper>
            <div style={{ display: 'none' }}>
                <Paper ref={printRef} style={{ padding: '20px', margin: '20px' }} sx={{ background: 'linear-gradient(180deg, #F8B177, #FBD8BB, #FEF2E8)' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '60px' }}>
                        DETAIL PESANAN
                    </h2>
                    <Grid container spacing={3} className='ml-2'>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Kode Pesanan:</strong> {orderDetails.kode_pesanan}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Nama Pemesan:</strong> {orderDetails.nama_pemesan}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Estimasi Waktu Selesai:</strong> {formatDate(orderDetails.estimatedTime)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Total Harga:</strong> Rp {orderDetails.totalHarga}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography><strong>Status:</strong> {orderDetails.status}</Typography>
                        </Grid>
                    </Grid>

                    {orderDetails.orderProducts.map((orderProduct, index) => (
                        <Box key={index} mt={3} mb={3} ml={4}>
                            <Divider className="mb-3" />
                            <Typography variant="h6" className="font-bold mb-2">Product {index + 1}</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Kode Produk:</strong> {orderProduct.product.kode_produk}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Nama Produk:</strong> {orderProduct.product.nama_produk}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Jumlah Produk:</strong> {orderProduct.product.jumlah_produk}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Deskripsi Produk:</strong> {orderProduct.product.deskripsi}</Typography>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Typography><strong>Materials:</strong></Typography>
                                <Grid container spacing={3}>
                                    {orderProduct.product.productMaterials.map((productMaterial, materialIndex) => (
                                        <Grid item xs={12} sm={4} key={materialIndex}>
                                            <Paper elevation={1} className="p-2 mb-2">
                                                <Typography variant="body1"><strong>{productMaterial.material.nama_material}</strong></Typography>
                                                <Typography variant="body2">Quantity: {productMaterial.quantity} {productMaterial.material.satuan}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    ))}
                </Paper>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336',
                    }}
                    message={snackbarMessage}
                />
            </Snackbar>
        </div>
    );
}
