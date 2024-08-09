"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Plus, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function TambahMaterial() {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        kode_material: '',
        nama_material: '',
        satuan: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/materials', 
                {
                    kode_material: formValues.kode_material,
                    nama_material: formValues.nama_material,
                    satuan: formValues.satuan
                }
            );
            if (response.status === 201) {
                router.push('/dashboard/Materials');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        };
    };
    
    const handleBack = () => {
        router.push('/dashboard/Materials');
    };
    return (
        <Container maxWidth>
            <Paper className="p-4 mt-4">
                <div className="mb-4">
                    <Typography variant="h4" className="flex items-center mb-4 text-2xl font-semibold">
                        Tambah Material
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Kode Material :</Typography>
                            <TextField
                                fullWidth
                                name="kode_material"
                                value={formValues.kode_material}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Nama Material :</Typography>
                            <TextField
                                fullWidth
                                name="nama_material"
                                value={formValues.nama_material}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Satuan :</Typography>
                            <TextField
                                fullWidth
                                name="satuan"
                                value={formValues.satuan}
                                onChange={handleInputChange}
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