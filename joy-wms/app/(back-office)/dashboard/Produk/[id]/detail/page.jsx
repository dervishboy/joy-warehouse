"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Paper, Grid, Typography, Box, Divider, Button } from "@mui/material";
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const formatAngka = (angka) => {
    const number = Number(angka);
    if (number >= 1000) {
        return new Intl.NumberFormat('id-ID').format(number);
    } else {
        return number.toString().replace('.', ',');
    }
};

export default function DetailProduk() {
    const router = useRouter();
    const { id } = useParams();

    const [productDetails, setProductDetails] = useState({
        kode_produk: '',
        nama_produk: '',
        deskripsi: '',
        productMaterials: [],
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
    
        fetchProductDetails();
    }, [id]);

    const handleBack = () => {
        router.push('/dashboard/Produk');
    }

    return (
        <div className='px-3 py-4'>
            <Paper className="p-4 mx-4 my-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Detail Produk</h2>
                    <Button
                        onClick={handleBack}
                        startIcon={<ArrowLeftCircle />}
                        className='bg-custom-jorange hover:bg-orange-600  text-custom-jhitam font-semibold'
                        variant='contained'
                        size='small'
                    >
                        Kembali
                    </Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography className='text-sm font-semibold'>Kode Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.kode_produk}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className='text-sm font-semibold'>Nama Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.nama_produk}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className='text-sm font-semibold'>Deskripsi Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.deskripsi}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className='text-sm font-semibold'>Jumlah Produk:</Typography>
                        <Typography className='text-sm font-semibold'>{productDetails.jumlah_produk}</Typography>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Typography className='mb-2'>Materials</Typography>
                    <Grid container spacing={3}>
                        {productDetails.productMaterials.map((material, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper elevation={1} className="p-2 mb-2">
                                    <Typography variant="body1"><strong>{material.material.nama_material}</strong></Typography>
                                    <Typography variant="body2">Quantity: {formatAngka(material.quantity)} {material.material.satuan}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
}
