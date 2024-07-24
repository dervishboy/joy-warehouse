"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, Anvil } from 'lucide-react';

export default function Produk() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'id', name: '#' },
        { id: 'kode_produk', name: 'Kode Produk' },
        { id: 'nama_produk', name: 'Nama Produk' },
        { id: 'deskripsi', name: 'Deskripsi' },
        { id: 'action', name: 'Action' }
    ];

    const rows = [
        { id: 1, kode_produk: 'PRD-001', nama_produk: 'Produk 1', deskripsi: 'Deskripsi Produk 1' },
        { id: 2, kode_produk: 'PRD-002', nama_produk: 'Produk 2', deskripsi: 'Deskripsi Produk 2' },
        { id: 3, kode_produk: 'PRD-003', nama_produk: 'Produk 3', deskripsi: 'Deskripsi Produk 3' },
        { id: 4, kode_produk: 'PRD-004', nama_produk: 'Produk 4', deskripsi: 'Deskripsi Produk 4' },
        { id: 5, kode_produk: 'PRD-005', nama_produk: 'Produk 5', deskripsi: 'Deskripsi Produk 5' },
        { id: 6, kode_produk: 'PRD-006', nama_produk: 'Produk 6', deskripsi: 'Deskripsi Produk 6' },
        { id: 7, kode_produk: 'PRD-007', nama_produk: 'Produk 7', deskripsi: 'Deskripsi Produk 7' },
        { id: 8, kode_produk: 'PRD-008', nama_produk: 'Produk 8', deskripsi: 'Deskripsi Produk 8' },
        { id: 9, kode_produk: 'PRD-009', nama_produk: 'Produk 9', deskripsi: 'Deskripsi Produk 9' },
        { id: 10, kode_produk: 'PRD-010', nama_produk: 'Produk 10', deskripsi: 'Deskripsi Produk 10' }
    ];

    const handleEdit = (id) => {
        console.log(`Edit row with id ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete row with id ${id}`);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: '',
            email: '',
            role: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        handleClose();
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
        row.kode_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.nama_produk.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <Anvil className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Data Produk</h2>
                    </div>
                    <div className='flex justify-between'>
                        <Button className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                            variant="outlined"
                            size="medium"
                            startIcon={<CirclePlus className='w-4 h-4' />}
                            onClick={handleClickOpen}
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
                        <Table>
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
                                    <TableRow key={row.kode_produk}>
                                        {columns.map((column) => (
                                            <TableCell className='text-sm font-semibold text-center' key={column.id}>
                                                {column.id === 'action' ? (
                                                    <div className='items-center space-x-2 text-center'>
                                                        <Button
                                                            className='bg-teal-400 hover:bg-teal-500 cursor-pointer text-custom-jhitam font-semibold'
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<Pencil className='w-4 h-4' />}
                                                            onClick={() => handleEdit(row.kode_produk)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            className='bg-red-400 hover:bg-red-500 cursor-pointer text-custom-jhitam font-semibold'
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<Trash2 className='w-4 h-4' />}
                                                            onClick={() => handleDelete(row.kode_produk)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    row[column.id]
                                                )}
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Produk</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Silahkan isi form berikut untuk menambahkan produk baru.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        name="kode_produk"
                        label="Kode Produk"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.kode_produk}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="nama_produk"
                        label="Nama Produk"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.nama_produk}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="deskripsi"
                        label="Deskripsi"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.deskripsi}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Batal
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Simpan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
