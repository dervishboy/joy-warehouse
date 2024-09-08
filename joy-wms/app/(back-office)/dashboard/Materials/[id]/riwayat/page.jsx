"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftCircle } from 'lucide-react';
import { Container, Grid, Paper, Typography, Divider, Box, Button } from "@mui/material";
import axios from 'axios';

const formatAngka = (angka) => {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    date.setHours(date.getHours() + 7);

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
};

export default function RiwayatMaterial() {
    const router = useRouter();
    const { id } = useParams();

    const [historyMaterials, setHistoryMaterials] = useState({
        kode_material: '',
        nama_material: '',
        movements: [],
        totalMovements: 0,
    });

    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    useEffect(() => {
        const fetchHistoryMaterials = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/materials/${id}`, {
                    params: {
                        page,
                        pageSize,
                    },
                });
                setHistoryMaterials(response.data);
            } catch (error) {
                console.error('Error fetching history materials:', error);
            }
        };

        fetchHistoryMaterials();
    }, [id, page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleBack = () => {
        router.push('/dashboard/Materials');
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
                <Typography variant="h5" className="mb-2 text-2xl font-semibold">RIWAYAT MATERIAL</Typography>
                <Box className="flex justify-between items-center mb-8">
                    <Typography className='text-2xl font-medium' >{historyMaterials.kode_material} - {historyMaterials.nama_material}</Typography>
                    <Button
                        onClick={handleBack}
                        startIcon={<ArrowLeftCircle />}
                        variant="contained"
                        className='bg-custom-jorange hover:bg-orange-600  text-custom-jhitam font-semibold'
                        color="primary"
                        size="small"
                    >
                        Kembali
                    </Button>
                </Box>
                <Divider />

                <Box mt={2}>
                    {historyMaterials.movements.length > 0 ? (
                        <>
                            <Grid container spacing={2}>
                                {historyMaterials.movements.map((movement, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Paper elevation={1} sx={{ padding: 2 }}>
                                            <Typography variant="body1">
                                                <strong>{movement.type === 'MASUK' ? 'MASUK' : 'KELUAR'}</strong>: {formatAngka(movement.quantity)} {historyMaterials.satuan}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {formatDate(movement.date)}
                                            </Typography>
                                            {movement.type === 'KELUAR' && movement.order ? (
                                                <Typography variant="body2" color="textSecondary">
                                                    Kode Pesanan: {movement.order.kode_pesanan}
                                                </Typography>
                                            ) : movement.type === 'KELUAR' && !movement.order ? (
                                                <Typography variant="body2" color="textSecondary">
                                                    Kode Pesanan : -
                                                </Typography>
                                            ) : null}
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box mt={4} className="flex justify-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={page === 1}
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={historyMaterials.movements.length < pageSize}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    Next
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No movement history available.
                        </Typography>

                    )}
                </Box>
            </Paper>
        </Container>
    );
}
