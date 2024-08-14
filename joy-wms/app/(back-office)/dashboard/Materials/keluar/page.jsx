"use client";

import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment } from "@mui/material";
import { Plus, Pencil, Trash2, Search, FolderOutput, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

export default function MaterialsKeluar() {
    const router = useRouter();

    const [materialsKeluar, setMaterialsKeluar] = useState([]);
    const [totalKeluar, setTotalKeluar] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'id', name: '#' },
        { id: 'material.kode_material', name: 'Kode Material' },
        { id: 'material.nama_material', name: 'Nama Material' },
        { id: 'date', name: 'Tanggal Keluar' },
        { id: 'quantity', name: 'Jumlah' },
    ];

    useEffect(() => {
        const fetchMaterialsKeluar = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movements/out', {
                    params: {
                        searchQuery: searchTerm,
                        page,
                        rowsPerPage
                    }
                });
                setMaterialsKeluar(response.data.materialsKeluar);
                setTotalKeluar(response.data.totalKeluar);
            } catch (error) {
                console.error('Error fetching materials keluar:', error);
            }
        }
        fetchMaterialsKeluar();
    }, [searchTerm, page, rowsPerPage]);

    const handleAdd = () => {
        router.push('/dashboard/Materials/keluar/tambah');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }


    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <FolderOutput className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Barang Keluar</h2>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex space-x-2'>
                            <Button
                                className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                variant="outlined"
                                size="medium"
                                startIcon={<Plus className='w-4 h-4' />}
                                onClick={handleAdd}
                            >
                                Tambah
                            </Button>
                        </div>
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
                <Paper>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            className="text-center bg-custom-jhitam text-custom-jputih font-semibold"
                                            key={column.id}
                                        >
                                            {column.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materialsKeluar.map((materialKeluar, index) => (
                                    <TableRow key={materialKeluar.id}>
                                        <TableCell className='text-sm font-semibold text-center'>{index + 1}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{materialKeluar.material.kode_material}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{materialKeluar.material.nama_material}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{formatDate(materialKeluar.date)}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{materialKeluar.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalKeluar}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}