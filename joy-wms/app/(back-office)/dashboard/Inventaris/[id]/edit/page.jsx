"use client";

import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography, Snackbar, SnackbarContent } from "@mui/material";
import { useRouter, useParams } from 'next/navigation';
import { File, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function EditInventaris() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        nama_barang: '',
        quantity: '',
        satuan: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/inventaris/${id}`);
                setFormData({
                    nama_barang: response.data.nama_barang,
                    quantity: response.data.quantity,
                    satuan: response.data.satuan,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/inventaris/${id}`, {
                nama_barang: formData.nama_barang,
                quantity: Number(formData.quantity),
                satuan: formData.satuan,
            });
            if (response.status === 200) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Data Inventaris berhasil diubah!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    router.push('/dashboard/Inventaris');
                }, 2000);
            }
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Gagal mengubah data inventaris!');
            setSnackbarOpen(true);
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Inventaris');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <Typography className='text-2xl font-semibold mb-8'>
                    Edit Inventaris
                </Typography>
                <form onSubmit={handleSubmit} className='ml-2'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Nama Barang :
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="nama_barang"
                                value={formData.nama_barang}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Jumlah :
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='number'
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Satuan :
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="satuan"
                                value={formData.satuan}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="text-right space-x-2">
                            <Button
                                variant="contained"
                                className="bg-custom-jorange hover:bg-orange-600 text-custom-jhitam font-semibold"
                                size='small'
                                onClick={handleBack}
                                startIcon={<ArrowLeft className='w-4 h-4' />}
                            >
                                Kembali
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size='small'
                                type="submit"
                                startIcon={<File className='w-4 h-4' />}
                            >
                                Simpan
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
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
