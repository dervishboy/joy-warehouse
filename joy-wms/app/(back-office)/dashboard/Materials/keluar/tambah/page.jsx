"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, Typography, Snackbar, SnackbarContent, InputAdornment, Autocomplete } from "@mui/material";
import { CirclePlus, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function TambahMaterialKeluar() {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        material_id: '',
        quantity: ''
    });

    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedSatuan, setSelectedSatuan] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        axios.get('http://localhost:5000/api/materials?rowsPerPage=-1')
            .then(response => {
                console.log('Fetched materials:', response.data);
                setMaterials(response.data.materials);
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
            });
    }, []);

    const handleMaterialChange = (event, newValue) => {
        setSelectedMaterial(newValue);
        setFormValues({ ...formValues, material_id: newValue ? newValue.id : '' });
        setSelectedSatuan(newValue ? newValue.satuan : '');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/movements/out', {
                material_id: formValues.material_id,
                quantity: Number(formValues.quantity)
            });
            console.log(response);
            if (response.status === 201) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Berhasil menambahkan material keluar!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    router.push('/dashboard/Materials/keluar');
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
        router.push('/dashboard/Materials/keluar');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth>
            <Paper className="p-4">
                <Typography className='text-2xl font-semibold mb-8'>
                    Tambah Material Keluar
                </Typography>
                <form onSubmit={handleSubmit} className='ml-2'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Material :
                            </Typography>
                            <Autocomplete
                                options={materials}
                                getOptionLabel={(material) => `${material.kode_material} - ${material.nama_material}`}
                                value={selectedMaterial}
                                onChange={handleMaterialChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Pilih material..."
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                )}
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
                                value={formValues.quantity}
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{selectedSatuan}</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} className='flex justify-between'>
                            <Button
                                variant="contained"
                                className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                size='small'
                                onClick={handleBack}
                                startIcon={<ArrowLeft className='w-4 h-4' />}
                            >
                                Kembali
                            </Button>
                            <Button
                                variant="contained"
                                className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                size='small'
                                type="submit"
                                startIcon={<CirclePlus className='w-4 h-4' />}
                            >
                                Tambah
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
        </Container>
    );
}
