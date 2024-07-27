"use client";

import React, { useState } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function TambahInventaris() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nama_barang: '',
        quantity: '',
        satuan: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        router.push('/dashboard/Inventaris');
    };

    return (
            <div className='px-3 py-4'>
                <Paper className="p-4">
                <Typography variant="h5" component="h2" gutterBottom>
                    Tambah Data Inventaris
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nama Barang"
                                name="nama_barang"
                                value={formData.nama_barang}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Jumlah"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Satuan"
                                name="satuan"
                                value={formData.satuan}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="text-right space-x-2">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => router.push('/dashboard/Inventaris')}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            </div>
    );
}
