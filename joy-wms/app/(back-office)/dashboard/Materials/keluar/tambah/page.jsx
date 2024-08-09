"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { Plus, ArrowLeft } from 'lucide-react';

export default function TambahMaterialKeluar() {
    const router = useRouter();

    // Hardcoded materials data
    const materials = [
        { id: 1, kode: 'MAT001', nama: 'Material A' },
        { id: 2, kode: 'MAT002', nama: 'Material B' },
        { id: 3, kode: 'MAT003', nama: 'Material C' },
    ];

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
        console.log('Form Values:', formValues);
        if (formValues.kode_bahan && formValues.tanggal && formValues.jumlah) {
            alert('Form submitted successfully!');
            router.push('/dashboard/Materials/keluar');
        } else {
            console.error('Failed to submit form');
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Materials/keluar');
    };

    return (
        <Container maxWidth>
            <Paper className="p-4 mt-4">
                <div className="mb-4">
                    <Typography variant="h4" className="flex items-center mb-8 font-semibold">
                        Tambah Stok Keluar
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Kode Material :</Typography>
                            <FormControl fullWidth>
                                <Select
                                    name="kode_bahan"
                                    value={formValues.kode_bahan}
                                    onChange={handleInputChange}
                                >
                                    {materials.map((material) => (
                                        <MenuItem key={material.id} value={material.kode}>
                                            {material.kode} - {material.nama}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Jumlah :</Typography>
                            <TextField
                                fullWidth
                                placeholder='Masukkan Jumlah Material'
                                name="jumlah"
                                type="number"
                                value={formValues.jumlah}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Tanggal :</Typography>
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
