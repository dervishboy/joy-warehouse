"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment } from "@mui/material";
import { Plus, Pencil, Trash2, Search, FolderPlus, Printer } from 'lucide-react';

export default function MaterialMasuk() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        kode_bahan: '',
        tanggal: '',
        jumlah: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'id', name: '#' },
        { id: 'kode_bahan', name: 'Kode Bahan Baku' },
        { id: 'tanggal', name: 'Tanggal' },
        { id: 'jumlah', name: 'Jumlah' },
        { id: 'action', name: 'Action' }
    ];

    const [rows, setRows] = useState([
        { id: '1', kode_bahan: 'BRG001', tanggal: '19-September-2023', jumlah: '65' },
        { id: '2', kode_bahan: 'BRG002', tanggal: '20-September-2023', jumlah: '150' },
        { id: '3', kode_bahan: 'BRG003', tanggal: '14-Desember-2023', jumlah: '125' },
        { id: '4', kode_bahan: 'BRG004', tanggal: '15-Januari-2024', jumlah: '80' },
        { id: '5', kode_bahan: 'BRG005', tanggal: '22-Februari-2024', jumlah: '300' },
    ]);

    const handleEdit = (id) => {
        console.log(`Edit row with id ${id}`);
    };

    const handleDelete = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            kode_bahan: '',
            tanggal: '',
            jumlah: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setRows([...rows, { id: (rows.length + 1).toString(), ...formData }]);
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
        row.kode_bahan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePrint = () => {
        console.log('Print barang masuk');
    }

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <FolderPlus className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Barang Masuk</h2>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex space-x-2'>
                            <Button
                                className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                variant="outlined"
                                size="medium"
                                startIcon={<Plus className='w-4 h-4' />}
                                onClick={handleClickOpen}
                            >
                                Tambah
                            </Button>
                            <Button
                                className='bg-blue-400 hover:bg-blue-500 cursor-pointer text-custom-jhitam font-semibold p-2'
                                variant="outlined"
                                size="medium"
                                startIcon={<Printer className='w-4 h-4' />}
                                onClick={handlePrint}
                            >
                                Cetak Barang Masuk
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
                                {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.kode_bahan}>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Tambah Barang Masuk</DialogTitle>
                <DialogContent>
                    <DialogContentText className='mb-8'>
                        Masukkan data barang yang ingin ditambahkan.
                    </DialogContentText>
                    <TextField className='mb-4'
                        autoFocus
                        name="kode_bahan"
                        placeholder="Kode Barang"
                        type="text"
                        variant='filled'
                        value={formData.kode_bahan}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField className='mb-4'
                        name="tanggal"
                        type="date"
                        variant='filled'
                        value={formData.tanggal}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField className='mb-4'
                        name="jumlah"
                        placeholder="Jumlah"
                        type="number"
                        variant='filled'
                        value={formData.jumlah}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Batal</Button>
                    <Button onClick={handleSubmit} color='primary'>Simpan</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
