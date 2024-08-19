"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Container, Grid, Paper, TextField, Button, MenuItem, Select, FormControl, IconButton, Typography, Box, InputAdornment } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircleMinus } from 'lucide-react';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function EditPesanan() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        nama_pemesan: '',
        kode_pesanan: '',
        estimatedTime: '',
        totalHarga: '',
        products: []
    });

    const fetchOrderData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
            setFormData({
                nama_pemesan: response.data.nama_pemesan,
                kode_pesanan: response.data.kode_pesanan,
                estimatedTime: formatDateForInput(response.data.estimatedTime),
                totalHarga: response.data.totalHarga,
                products: response.data.products
            });
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    }

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <Typography variant="h5" className="font-semibold mb-4">Edit Pesanan</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>Nama Pemesan:</Typography>
                            <TextField
                                name="nama_pemesan"
                                variant="filled"
                                fullWidth
                                value={formData.nama_pemesan}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Kode Pesanan:</Typography>
                            <TextField
                                name="kode_pesanan"
                                variant="filled"
                                fullWidth
                                value={formData.kode_pesanan}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Estimasi Penyelesaian:</Typography>
                            <TextField
                                name="estimatedTime"
                                type="date"
                                variant="filled"
                                fullWidth
                                value={formData.estimatedTime}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                    </Grid>
                    {formData.products && formData.products.length > 0 ? (
                        formData.products.map((product, index) => (
                            <Box key={index} display="flex" mt={3}>
                                <Box flex={1} mr={2}>
                                    <Typography className='font-bold'>PRODUCT {index + 1}</Typography>
                                    <Paper className="p-4 mb-4 mt-3">
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography>Kode Produk:</Typography>
                                                <TextField
                                                    name="kode_produk"
                                                    variant="filled"
                                                    fullWidth
                                                    value={product.kode_produk}
                                                    onChange={(e) => handleChange(e, index, 'kode_produk', true)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>Nama Produk:</Typography>
                                                <TextField
                                                    name="nama_produk"
                                                    variant="filled"
                                                    fullWidth
                                                    value={product.nama_produk}
                                                    onChange={(e) => handleChange(e, index, 'nama_produk', true)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className='mb-4'>Deskripsi Produk:</Typography>
                                                <TextField
                                                    name="deskripsi"
                                                    variant="outlined"
                                                    multiline
                                                    rows={9}
                                                    fullWidth
                                                    value={product.deskripsi}
                                                    onChange={(e) => handleChange(e, index, 'deskripsi', true)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className="flex justify-end">
                                                <IconButton onClick={() => removeProduct(index)}>
                                                    <CircleMinus />
                                                    <Typography className='ml-2'>Hapus Produk</Typography>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                                <Box flex={1} ml={2}>
                                    <Typography className='font-bold'>MATERIAL</Typography>
                                    {product.materials && product.materials.length > 0 ? (
                                        product.materials.map((material, materialIndex) => (
                                            <Paper className="p-2 mb-2 mt-3" key={materialIndex}>
                                                <Grid container spacing={1} alignItems="center">
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography>Material {materialIndex + 1}:</Typography>
                                                        <FormControl fullWidth variant="outlined" size='small'>
                                                            <Select
                                                                name="nama_material"
                                                                value={material.nama_material}
                                                                onChange={(e) => handleChange(e, index, 'nama_material', true, materialIndex)}
                                                            >
                                                                {materials.map((materialOption) => (
                                                                    <MenuItem key={materialOption.id} value={materialOption.nama_material}>
                                                                        {materialOption.nama_material}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={6} sm={4}>
                                                        <Typography>Quantity:</Typography>
                                                        <TextField
                                                            name="quantity"
                                                            type="number"
                                                            variant="filled"
                                                            fullWidth
                                                            value={material.quantity}
                                                            onChange={(e) => handleChange(e, index, 'quantity', true, materialIndex)}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <Typography>{material.satuan}</Typography>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3} sm={2} className="flex justify-end items-center">
                                                        <IconButton onClick={() => removeMaterial(index, materialIndex)}>
                                                            <CircleMinus />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ))
                                    ) : (
                                        <Typography>No materials found</Typography>
                                    )}
                                    <Box mt={2}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            size='small'
                                            startIcon={<AddCircleOutlineIcon />}
                                            onClick={() => addMaterial(index)}
                                            className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                        >
                                            Tambah Material
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography>No products found</Typography>
                    )}
                    <Box mt={4}>
                        <Typography>Total Harga:</Typography>
                        <TextField
                            name="totalHarga"
                            type='number'
                            variant="filled"
                            fullWidth
                            value={formData.totalHarga}
                            onChange={(e) => handleChange(e)}
                        />
                    </Box>
                    <Box mt={4}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={addProduct}
                            className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                        >
                            Tambah Produk
                        </Button>
                    </Box>
                    <Box mt={4} className="space-x-2">
                        <Button
                            variant="outlined"
                            size='small'
                            onClick={handleBack}
                            className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                        >
                            Kembali
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size='small'
                        >
                            Simpan
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
}
