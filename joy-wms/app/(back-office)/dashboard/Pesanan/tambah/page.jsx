"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, MenuItem, Select, FormControl, IconButton, Typography, Box, InputAdornment } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircleMinus } from 'lucide-react';
import axios from 'axios';

export default function TambahPesanan() {
    const [formData, setFormData] = useState({
        nama_pemesan: '',
        kode_pesanan: '',
        estimatedTime: '',
        totalHarga: '',
        products: [
            {
                kode_produk: '',
                nama_produk: '',
                deskripsi: '',
                productMaterials: [
                    {
                        material_id: '',
                        quantity: ''
                    }
                ]
            }
        ]
    });

    const [materials, setMaterials] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/materials');
                setMaterials(response.data.materials);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterials();
    }, []);

    const handleChange = (event, index, field, isProductField = false, materialIndex = null) => {
        const { name, value } = event.target;

        if (isProductField) {
            const newProducts = formData.products.map((product, idx) => {
                if (idx === index) {
                    if (materialIndex !== null) {
                        const newMaterials = product.productMaterials.map((material, mIdx) => {
                            if (mIdx === materialIndex) {
                                let updatedMaterial = { ...material, [field]: value };
                                return updatedMaterial;
                            }
                            return material;
                        });
                        return { ...product, productMaterials: newMaterials };
                    } else {
                        return { ...product, [field]: value };
                    }
                }
                return product;
            });

            setFormData({ ...formData, products: newProducts });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addProduct = () => {
        setFormData({
            ...formData,
            products: [
                ...formData.products,
                {
                    kode_produk: '',
                    nama_produk: '',
                    deskripsi: '',
                    productMaterials: [
                        {
                            material_id: '',
                            quantity: ''
                        }
                    ]
                }
            ]
        });
    };

    const removeProduct = (index) => {
        const newProducts = formData.products.filter((_, idx) => idx !== index);
        setFormData({ ...formData, products: newProducts });
    };

    const addMaterial = (index) => {
        const newProducts = formData.products.map((product, idx) => {
            if (idx === index) {
                return {
                    ...product,
                    productMaterials: [
                        ...product.productMaterials,
                        {
                            material_id: '',
                            quantity: ''
                        }
                    ]
                };
            }
            return product;
        });

        setFormData({ ...formData, products: newProducts });
    };

    const removeMaterial = (index, materialIndex) => {
        const newProducts = formData.products.map((product, idx) => {
            if (idx === index) {
                const newMaterials = product.productMaterials.filter((_, mIdx) => mIdx !== materialIndex);
                return { ...product, productMaterials: newMaterials };
            }
            return product;
        });

        setFormData({ ...formData, products: newProducts });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/orders', {
                nama_pemesan: formData.nama_pemesan,
                kode_pesanan: formData.kode_pesanan,
                estimatedTime: formData.estimatedTime,
                totalHarga: formData.totalHarga,
                products: formData.products.map(product => ({
                    kode_produk: product.kode_produk,
                    nama_produk: product.nama_produk,
                    deskripsi: product.deskripsi,
                    productMaterials: product.productMaterials.map(material => ({
                        material_id: material.material_id,
                        quantity: Number(material.quantity)
                    }))
                }))
            });
            if (response.status === 201) {
                router.push('/dashboard/Pesanan');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Tambah Pesanan
            </Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nama Pemesan"
                                name="nama_pemesan"
                                value={formData.nama_pemesan}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Kode Pesanan"
                                name="kode_pesanan"
                                value={formData.kode_pesanan}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Estimated Time"
                                name="estimatedTime"
                                type="datetime-local"
                                value={formData.estimatedTime}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Total Harga"
                                name="totalHarga"
                                type="number"
                                value={formData.totalHarga}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>

                    {formData.products.map((product, index) => (
                        <Box key={index} mt={3} mb={3}>
                            <Typography variant="h6">
                                Produk {index + 1}
                            </Typography>
                            <Paper elevation={2} style={{ padding: '20px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Kode Produk"
                                            name="kode_produk"
                                            value={product.kode_produk}
                                            onChange={(e) => handleChange(e, index, 'kode_produk', true)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Nama Produk"
                                            name="nama_produk"
                                            value={product.nama_produk}
                                            onChange={(e) => handleChange(e, index, 'nama_produk', true)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Deskripsi"
                                            name="deskripsi"
                                            value={product.deskripsi}
                                            onChange={(e) => handleChange(e, index, 'deskripsi', true)}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            required
                                        />
                                    </Grid>

                                    {product.productMaterials.map((material, materialIndex) => (
                                        <Grid container spacing={2} key={materialIndex}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth required>
                                                    <Select
                                                        value={material.material_id}
                                                        onChange={(e) => handleChange(e, index, 'material_id', true, materialIndex)}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="">
                                                            <em>Pilih Material</em>
                                                        </MenuItem>
                                                        {materials.map((mat) => (
                                                            <MenuItem key={mat.id} value={mat.id}>
                                                                {mat.kode_material} - {mat.nama_material}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Quantity"
                                                    name="quantity"
                                                    type="number"
                                                    value={material.quantity}
                                                    onChange={(e) => handleChange(e, index, 'quantity', true, materialIndex)}
                                                    fullWidth
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} className="flex items-center">
                                                <IconButton onClick={() => removeMaterial(index, materialIndex)}>
                                                    <CircleMinus />
                                                    <Typography className='ml-2'>Hapus Material</Typography>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={() => addMaterial(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Tambah Material
                                </Button>
                            </Paper>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => removeProduct(index)}
                                style={{ marginTop: '10px' }}
                            >
                                Hapus Produk
                            </Button>
                        </Box>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={addProduct}
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        Tambah Produk
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Simpan Pesanan
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
