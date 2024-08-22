"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Container, Grid, Paper, TextField, Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { Plus, ArrowLeft } from 'lucide-react';

export default function TambahMaterialMasuk() {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        material_id: '',
        quantity: ''
    });

    const [materials, setMaterials] = useState([]);

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
                setFormValues(prevValues => ({
                    ...prevValues,
                    kode_material: selectedMaterial.kode_material,
                    nama_material: selectedMaterial.nama_material
                }));
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
                router.push('/dashboard/Materials/masuk');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Materials/masuk');
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
        </Container>
    );
}
