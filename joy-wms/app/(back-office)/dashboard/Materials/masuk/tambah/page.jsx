"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Plus, ArrowLeft } from 'lucide-react';

export default function TambahMaterialMasuk() {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        kode_bahan: '',
        tanggal: '',
        jumlah: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/movements/in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        if (response.ok) {
            // Handle successful form submission
            router.push('/dashboard/Materials/masuk');
        } else {
            // Handle form submission error
            console.error('Failed to submit form');
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Materials/masuk');
    };

    return (
        <Container maxWidth="md">
            <Paper className="p-4 mt-4">
                <div className="mb-4">
                    <Typography variant="h4" className="flex items-center mb-4">
                        Tambah Stok Masuk
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder='Kode Bahan'
                                name="kode_bahan"
                                value={formValues.kode_bahan}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder='Jumlah'
                                name="jumlah"
                                type="number"
                                value={formValues.jumlah}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="tanggal"
                                type="date"
                                value={formValues.tanggal}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="flex justify-end space-x-2">
                            <Button
                                variant="contained"
                                color="secondary"
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
                                startIcon={<Plus className='w-4 h-4' />}
                            >
                                Tambah
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
