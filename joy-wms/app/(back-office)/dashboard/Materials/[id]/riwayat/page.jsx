"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftCircle } from 'lucide-react';
import { Container, Paper, Typography, Divider, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
    const [initialSaldo, setInitialSaldo] = useState(0);

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

                let saldoAwal = response.data.initialSaldo || 0;
                setInitialSaldo(saldoAwal);
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
                    <Typography className='text-2xl font-medium'>{historyMaterials.kode_material} - {historyMaterials.nama_material}</Typography>
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
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Tanggal</TableCell>
                                            <TableCell align="left">Stok Masuk</TableCell>
                                            <TableCell align="left">Stok Keluar</TableCell>
                                            <TableCell align="left">Saldo Terakhir</TableCell>
                                            <TableCell align="left">Kode Pesanan</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {historyMaterials.movements.reduce((acc, movement, index) => {
                                            let stokMasuk = '-';
                                            let stokKeluar = '-';
                                            let kodePesanan = '-';

                                            if (movement.type === 'MASUK') {
                                                stokMasuk = formatAngka(movement.quantity);
                                                acc.saldo += movement.quantity;
                                            } else if (movement.type === 'KELUAR') {
                                                stokKeluar = formatAngka(movement.quantity);
                                                acc.saldo -= movement.quantity;
                                                kodePesanan = movement.order ? movement.order.kode_pesanan : '-';
                                            }

                                            acc.rows.push(
                                                <TableRow key={index}>
                                                    <TableCell>{formatDate(movement.date)}</TableCell>
                                                    <TableCell align="left">{stokMasuk}</TableCell>
                                                    <TableCell align="left">{stokKeluar}</TableCell>
                                                    <TableCell align="left">{formatAngka(acc.saldo)}</TableCell>
                                                    <TableCell align="left">{kodePesanan}</TableCell>
                                                </TableRow>
                                            );

                                            return acc;
                                        }, { saldo: initialSaldo, rows: [] }).rows}
                                    </TableBody>
                                </Table>
                            </TableContainer>

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
                        <Typography variant="body2" color="textSecondary" className='text-center'>
                            Tidak Ada History Material
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}