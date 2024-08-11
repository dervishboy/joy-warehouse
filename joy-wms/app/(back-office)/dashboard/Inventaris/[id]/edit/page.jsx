"use client";

import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditInventaris() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        nama_barang: '',
        quantity: '',
        satuan: '',
    });

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
                router.push('/dashboard/Inventaris');
            }
        } catch (error) {
            console.error('Error updating inventaris:', error);
        }
    };

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
