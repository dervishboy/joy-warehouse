"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container, Grid, Paper, TextField, Button, MenuItem, Select, FormControl, IconButton, Typography, Box, InputAdornment } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircleMinus } from 'lucide-react';

export default function EditPesanan() {
    const [formData, setFormData] = useState({
        nama_pemesan: '',
        kode_pesanan: '',
        estimatedTime: '',
        products: [
            {
                kode_produk: '',
                nama_produk: '',
                deskripsi: '',
                materials: [
                    {
                        nama_material: '',
                        quantity: '',
                        satuan: ''
                    }
                ]
            }
        ]
    });

    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        // Fetch order details by id and set form data
        const fetchOrder = async () => {
            // Mock API call
            const order = {
                nama_pemesan: 'John Doe',
                kode_pesanan: 'ORD001',
                estimatedTime: '2023-08-01',
                products: [
                    {
                        kode_produk: 'PROD001',
                        nama_produk: 'Product A',
                        deskripsi: 'Description A',
                        materials: [
                            { nama_material: 'Akrilik', quantity: '10', satuan: 'Lembar' },
                            { nama_material: 'Kabel', quantity: '10', satuan: 'Cm' },
                            { nama_material: 'Lampu', quantity: '5', satuan: 'Pcs' }
                        ]
                    },
                    {
                        kode_produk: 'PROD002',
                        nama_produk: 'Product B',
                        deskripsi: 'Description B',
                        materials: [
                            { nama_material: 'Kabel', quantity: '20', satuan: 'Cm' },
                            { nama_material: 'Lampu', quantity: '5', satuan: 'Pcs' }
                        ]
                    }
                ]
            };
            setFormData(order);
        };

        fetchOrder();

        const mockProducts = [
            { id: 1, nama_produk: 'Product A', kode_produk: 'PROD001', deskripsi: 'Description A' },
            { id: 2, nama_produk: 'Product B', kode_produk: 'PROD002', deskripsi: 'Description B' }
        ];
        const mockMaterials = [
            { id: 1, nama_material: 'Akrilik', quantity: '100', satuan: 'Lembar' },
            { id: 2, nama_material: 'Kabel', quantity: '200', satuan: 'Cm' },
            { id: 3, nama_material: 'Lampu', quantity: '50', satuan: 'Pcs' }
        ];

        setProducts(mockProducts);
        setMaterials(mockMaterials);
    }, [id]);

    const handleChange = (event, index, field, isProductField = false, materialIndex = null) => {
        const { name, value } = event.target;

        if (isProductField) {
            const newProducts = formData.products.map((product, idx) => {
                if (idx === index) {
                    if (materialIndex !== null) {
                        const newMaterials = product.materials.map((material, mIdx) => {
                            if (mIdx === materialIndex) {
                                let updatedMaterial = { ...material, [field]: value };
                                if (field === 'nama_material') {
                                    const selectedMaterial = materials.find(mat => mat.nama_material === value);
                                    updatedMaterial.satuan = selectedMaterial ? selectedMaterial.satuan : '';
                                }
                                return updatedMaterial;
                            }
                            return material;
                        });
                        return { ...product, materials: newMaterials };
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
                    materials: [
                        {
                            nama_material: '',
                            quantity: '',
                            satuan: ''
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
                    materials: [
                        ...product.materials,
                        {
                            nama_material: '',
                            quantity: '',
                            satuan: ''
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
                const newMaterials = product.materials.filter((_, mIdx) => mIdx !== materialIndex);
                return { ...product, materials: newMaterials };
            }
            return product;
        });

        setFormData({ ...formData, products: newProducts });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        router.push('/dashboard/Pesanan');
    };

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Edit Pesanan</h2>
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
                    {formData.products.map((product, index) => (
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
                                {product.materials.map((material, materialIndex) => (
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
                                                    variant="outlined"
                                                    size="small"
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
                                            <Grid item xs={3} sm={2} className="flex justify-end">
                                                <IconButton onClick={() => removeMaterial(index, materialIndex)}>
                                                    <CircleMinus />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))}
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
                    ))}
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
                    <Box mt={4} className="text-right space-x-2">
                        <Button
                            variant="contained"
                            onClick={() => router.push('/dashboard/Pesanan')}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                        >
                            Simpan
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div>
    );
}
