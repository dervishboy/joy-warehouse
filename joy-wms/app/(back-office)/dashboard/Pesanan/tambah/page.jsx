"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar, SnackbarContent, Grid, Paper, Typography, Box, Divider, Button, TextField, Select, MenuItem, FormControl, IconButton, InputAdornment, Autocomplete } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircleMinus, ArrowLeft } from 'lucide-react';
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
                jumlah_produk: '',
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
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedSatuan, setSelectedSatuan] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const router = useRouter();

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/materials?rowsPerPage=-1');
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
                    jumlah_produk: '',
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
            const checkOrderResponse = await axios.get(`http://localhost:5000/api/orders?kode_pesanan=${formData.kode_pesanan}`);
            console.log("Order Check Response:", checkOrderResponse.data);
    
            const orders = checkOrderResponse.data.orders;
            const orderExists = orders.some(order => order.kode_pesanan === formData.kode_pesanan);
    
            if (orderExists) {
                alert('Kode pesanan sudah ada. Silakan gunakan kode yang berbeda.');
                return;
            }
    
            for (let i = 0; i < formData.products.length; i++) {
                const product = formData.products[i];
                const checkProductResponse = await axios.get(`http://localhost:5000/api/products?kode_produk=${product.kode_produk}`);
                console.log(`Product Check Response for ${product.kode_produk}:`, checkProductResponse.data);
    
                const products = checkProductResponse.data.products;
                const productExists = products.some(prod => prod.kode_produk === product.kode_produk);
    
                if (productExists) {
                    alert(`Kode produk ${product.kode_produk} sudah ada. Silakan gunakan kode yang berbeda untuk produk.`);
                    return;
                }
    
                for (let j = 0; j < product.productMaterials.length; j++) {
                    const material = product.productMaterials[j];
                    const materialResponse = await axios.get(`http://localhost:5000/api/materials/${material.material_id}`);
                    console.log(`Material Check Response for ${material.material_id}:`, materialResponse.data);
    
                    if (material.quantity > materialResponse.data.quantity) {
                        alert(`Jumlah material ${materialResponse.data.kode_material} tidak mencukupi. Stok tersedia: ${materialResponse.data.quantity}.`);
                        return;
                    }
                }
            }

            const response = await axios.post('http://localhost:5000/api/orders', {
                nama_pemesan: formData.nama_pemesan,
                kode_pesanan: formData.kode_pesanan,
                estimatedTime: formData.estimatedTime,
                totalHarga: formData.totalHarga,
                products: formData.products.map(product => ({
                    kode_produk: product.kode_produk,
                    nama_produk: product.nama_produk,
                    jumlah_produk: Number(product.jumlah_produk),
                    deskripsi: product.deskripsi,
                    productMaterials: product.productMaterials.map(material => ({
                        material_id: material.material_id,
                        quantity: Number(material.quantity)
                    }))
                }))
            });
    
            if (response.status === 201) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Data Pesanan berhasil ditambahkan!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    router.push('/dashboard/Pesanan');
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
        router.push('/dashboard/Pesanan');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Tambah Pesanan</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">Nama Pemesan :</Typography>
                            <TextField
                                name="nama_pemesan"
                                value={formData.nama_pemesan}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">Kode Pesanan :</Typography>
                            <TextField
                                name="kode_pesanan"
                                value={formData.kode_pesanan}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">Estimasi Waktu Selesai :</Typography>
                            <TextField
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
                            <Typography variant="body1">Total Harga :</Typography>
                            <TextField
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
                        <Box key={index} mt={3} display="flex">
                            <Box flex={1} mr={2}>
                                <Typography variant="h6" className="text-md font-semibold">
                                    PRODUK {index + 1}
                                </Typography>
                                <Paper elevation={3} className="p-4 mb-4">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body1">Kode Produk :</Typography>
                                            <TextField
                                                name="kode_produk"
                                                value={product.kode_produk}
                                                onChange={(e) => handleChange(e, index, 'kode_produk', true)}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body1">Nama Produk :</Typography>
                                            <TextField
                                                name="nama_produk"
                                                value={product.nama_produk}
                                                onChange={(e) => handleChange(e, index, 'nama_produk', true)}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body1">Jumlah Produk :</Typography>
                                            <TextField
                                                name="jumlah_produk"
                                                type="number"
                                                value={product.jumlah_produk}
                                                onChange={(e) => handleChange(e, index, 'jumlah_produk', true)}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Deskripsi / Catatan :</Typography>
                                            <TextField
                                                name="deskripsi"
                                                value={product.deskripsi}
                                                onChange={(e) => handleChange(e, index, 'deskripsi', true)}
                                                fullWidth
                                                multiline
                                                rows={6}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} className='flex justify-end'>
                                            <IconButton onClick={() => removeProduct(index)}>
                                                <CircleMinus />
                                                <Typography className='ml-2'>Hapus Produk</Typography>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                            <Box flex={1} mr={2}>
                                <Paper elevation={3} className="p-4 mb-4">
                                    <Grid container spacing={2}>
                                        {product.productMaterials.map((material, materialIndex) => (
                                            <Grid container spacing={2} key={materialIndex} className='mt-1'>
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth required className='ml-2'>
                                                        <Typography variant="body1">Material {materialIndex + 1} :</Typography>
                                                        <Autocomplete
                                                            options={materials}
                                                            size='small'
                                                            getOptionLabel={(material) => `${material.kode_material} - ${material.nama_material}`}
                                                            value={selectedMaterial}
                                                            onChange={(event, newValue) => {
                                                                setSelectedMaterial(newValue);
                                                                setSelectedSatuan(newValue.satuan);
                                                                handleChange({ target: { name: 'material_id', value: newValue.id } }, index, 'material_id', true, materialIndex);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder="Pilih material..."
                                                                    variant="outlined"
                                                                    fullWidth
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Typography variant="body1">Jumlah :</Typography>
                                                    <TextField
                                                        type="number"
                                                        name="quantity"
                                                        value={material.quantity}
                                                        onChange={(e) => handleChange(e, index, 'quantity', true, materialIndex)}
                                                        fullWidth
                                                        required
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">{selectedSatuan}</InputAdornment>
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <IconButton onClick={() => removeMaterial(index, materialIndex)}>
                                                        <CircleMinus />
                                                        <Typography className='ml-2'>Hapus Material</Typography>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={12} sm={6} className='flex justify-end'>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<AddCircleOutlineIcon />}
                                                        onClick={() => addMaterial(index)}
                                                        className='bg-custom-jorange hover:bg-orange-500 text-custom-jhitam font-semibold'
                                                    >
                                                        Tambah Material
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        ))}

                                        <Grid item xs={12}>

                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        </Box>
                    ))}

                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={addProduct}
                        className='bg-custom-jorange hover:bg-orange-500 text-custom-jhitam font-semibold'
                    >
                        Tambah Produk
                    </Button>

                    <Divider className="my-6" />

                    <Grid item xs={12} className='flex justify-between'>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleBack}
                            startIcon={<ArrowLeft />}
                            className="mr-2 bg-custom-jorange hover:bg-orange-500 text-custom-jhitam font-semibold"
                        >
                            Kembali
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<AddCircleOutlineIcon />}
                            className="bg-custom-jorange hover:bg-orange-500 text-custom-jhitam font-semibold"
                        >
                            Tambah Pesanan
                        </Button>
                    </Grid>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
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
        </div>
    );
}
