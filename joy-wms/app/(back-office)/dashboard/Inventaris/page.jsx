"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Warehouse, Search } from 'lucide-react';

export default function Inventaris() {
    

    const columns = [
        { id: 'id', name: '#' },
        { id: 'kode_barang', name: 'Kode Barang' },
        { id: 'nama_barang', name: 'Nama Barang' },
        { id: 'jumlah', name: 'Jumlah' },
        { id: 'satuan', name: 'Satuan' },
        { id: 'action', name: 'Action' }
    ];

    const initialRows = [
        { id: '1', kode_barang: 'BRG001', nama_barang: 'Akrilik', jumlah: '47', satuan: 'Lembar' },
        { id: '2', kode_barang: 'BRG002', nama_barang: 'Lampu', jumlah: '123', satuan: 'Pcs' },
        { id: '3', kode_barang: 'BRG003', nama_barang: 'Kabel', jumlah: '15', satuan: 'Meter' },
        { id: '4', kode_barang: 'BRG004', nama_barang: 'Kain', jumlah: '100', satuan: 'Meter' },
        { id: '5', kode_barang: 'BRG005', nama_barang: 'Kertas', jumlah: '500', satuan: 'Lembar' },
        { id: '6', kode_barang: 'BRG006', nama_barang: 'Keramik', jumlah: '100', satuan: 'Meter' },
        { id: '7', kode_barang: 'BRG007', nama_barang: 'Kaca', jumlah: '50', satuan: 'Meter' },
    ];

    const [rows, setRows] = useState(initialRows);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleEdit = (id) => {
        console.log(`Edit row with id ${id}`);
    };

    const handleDelete = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

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

    const filteredRows = rows.filter((row) =>
        row.kode_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <Warehouse className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Data Inventaris</h2>
                    </div>
                    <div className='flex justify-between'>
                            <Button className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                variant="outlined"
                                size="medium"
                                startIcon={<CirclePlus className='w-4 h-4' />}
                            >
                                Tambah
                            </Button>
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
                                    <TableRow key={row.kode_barang}>
                                        {columns.map((column) => (
                                            <TableCell className='text-sm font-semibold text-center' key={column.id}>
                                                {column.id === 'action' ? (
                                                    <div className='items-center space-x-2 text-center'>
                                                        <Button
                                                            className='bg-teal-400 hover:bg-teal-500 cursor-pointer text-custom-jhitam font-semibold'
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<Pencil className='w-4 h-4' />}
                                                            onClick={() => handleEdit(row.id)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            className='bg-red-400 hover:bg-red-500 cursor-pointer text-custom-jhitam font-semibold'
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<Trash2 className='w-4 h-4' />}
                                                            onClick={() => handleDelete(row.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                ) : row[column.id]}
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
