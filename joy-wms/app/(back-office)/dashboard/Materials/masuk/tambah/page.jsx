"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Container, Grid, Paper, TextField, Button, Typography, FormControl, Select, MenuItem, Snackbar, SnackbarContent, InputAdornment } from "@mui/material";
import { Plus, ArrowLeft } from 'lucide-react';

export default function TambahMaterialMasuk() {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        material_id: '',
        quantity: '',
    });

    const [materials, setMaterials] = useState([]);
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === "material_id") {
            const selectedMaterial = materials.find(material => material.id === parseInt(value));
            if (selectedMaterial) {
                setSelectedSatuan(selectedMaterial.satuan);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/movements/in', {
                material_id: formValues.material_id,
                quantity: Number(formValues.quantity)
            });
            console.log(response);
            if (response.status === 201) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Berhasil menambahkan material masuk!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    router.push('/dashboard/Materials/masuk');
                }, 2000);
            }
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Terjadi kesalahan saat menambahkan material!');
            setSnackbarOpen(true);
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Materials/masuk');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth>
            <Paper className="p-4">
                <Typography className='text-2xl font-semibold mb-8'>
                    Tambah Material Masuk
                </Typography>
                <form onSubmit={handleSubmit} className='ml-2'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Kode Material :
                            </Typography>
                            <FormControl fullWidth size='small'>
                                <Select
                                    name="material_id"
                                    value={formValues.material_id}
                                    onChange={handleInputChange}
                                    required
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 48 * 4.5 + 8,
                                                width: 250,
                                            },
                                        },
                                    }}
                                >
                                    {materials.map((material) => (
                                        <MenuItem key={material.id} value={material.id}>
                                            {material.kode_material} - {material.nama_material}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                onClick={handleBack}
                                variant="contained"
                                color="secondary"
                                startIcon={<ArrowLeft />}
                                className="ml-2"
                            >
                                Kembali
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<Plus />}
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
