"use client";

import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Snackbar, SnackbarContent } from "@mui/material";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function TambahInventaris() {
    const router = useRouter();

    const [formValue, setFormValue] = useState({
        nama_barang: '',
        quantity: '',
        satuan: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/inventaris', {
                nama_barang: formValue.nama_barang,
                quantity: Number(formValue.quantity),
                satuan: formValue.satuan
            });
            if (response.status === 201) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Data Inventaris berhasil ditambahkan!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    router.push('/dashboard/Inventaris');
                }, 2000);
            }
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Terjadi kesalahan saat menambahkan data!');
            setSnackbarOpen(true);
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Inventaris');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <Typography className='text-2xl font-semibold mb-8'>
                    Tambah Data Inventaris
                </Typography>
                <form onSubmit={handleSubmit} className='ml-2'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Nama Barang :
                            </Typography>
                            <TextField
                                fullWidth
                                name="nama_barang"
                                onChange={handleInputChange}
                                value={formValue.nama_barang}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Jumlah :
                            </Typography>
                            <TextField
                                fullWidth
                                type='number'
                                name="quantity"
                                onChange={handleInputChange}
                                value={formValue.quantity}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Satuan :
                            </Typography>
                            <TextField
                                fullWidth
                                name="satuan"
                                onChange={handleInputChange}
                                value={formValue.satuan}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="text-right space-x-2">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Tambah
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
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
