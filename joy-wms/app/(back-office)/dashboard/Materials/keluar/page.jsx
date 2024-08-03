"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment } from "@mui/material";
import { Plus, Pencil, Trash2, Search, FolderOutput, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MaterialsKeluar() {
    const columns = [
        { id: 'id', name: '#' },
        { id: 'kode_bahan', name: 'Kode Bahan Baku' },
        { id: 'tanggal', name: 'Tanggal' },
        { id: 'jumlah', name: 'Jumlah' }
    ];

    const [rows] = useState([
        { id: '1', kode_bahan: 'BRG001', tanggal: '19-September-2023', jumlah: '47' },
        { id: '2', kode_bahan: 'BRG002', tanggal: '20-September-2023', jumlah: '123' },
        { id: '3', kode_bahan: 'BRG003', tanggal: '14-Desember-2023', jumlah: '15' },
    ]);

    const router = useRouter();
    const handleAdd = () => {
        router.push('/dashboard/Materials/keluar/tambah');
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const handlePrint = () => {
    //     console.log('Print Barang Keluar');
    // };

    const filteredRows = rows.filter((row) =>
        row.kode_bahan.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            {/* <Button
                                className='bg-blue-400 hover:bg-blue-500 cursor-pointer text-custom-jhitam font-semibold p-2'
                                variant="outlined"
                                size="medium"
                                startIcon={<Printer className='w-4 h-4' />}
                                onClick={handlePrint}
                            >
                                Cetak Barang Keluar
                            </Button> */}
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
                                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell className='text-sm font-semibold text-center' key={column.id}>
                                            {row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRows.length}
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
