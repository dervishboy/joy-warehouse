"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { File, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function EditMaterial() {
    const router = useRouter();
    const { id } = useParams();

    const [formValues, setFormValues] = useState({
        kode_material: '',
        nama_material: '',
        satuan: '',
    });

    const fetchMaterial = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/materials/${id}`);
                setFormValues({
                    kode_material: response.data.kode_material,
                    nama_material: response.data.nama_material,
                    satuan: response.data.satuan,
                });
            } catch (error) {
                console.error('Error fetching material:', error);
            }
        };
    
    useEffect(() => {
        fetchMaterial(id);
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/materials/${id}`,
                {
                    kode_material: formValues.kode_material,
                    nama_material: formValues.nama_material,
                    satuan: formValues.satuan,
                }
            );
            if (response.status === 200) {
                router.push('/dashboard/Materials');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Materials');
    };

    return (
        <Container maxWidth>
            <Paper className="p-4 mt-4">
                <div className="mb-4">
                    <Typography variant="h4" className="flex items-center mb-4 text-2xl font-semibold">
                        Edit Material
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Kode Bahan :</Typography>
                            <TextField
                                fullWidth
                                name="kode_material"
                                value={formValues.kode_material}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Nama Bahan Baku :</Typography>
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
        </Container>
    );
}
