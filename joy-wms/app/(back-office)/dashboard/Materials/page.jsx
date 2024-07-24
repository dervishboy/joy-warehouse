"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, FolderCog } from 'lucide-react';

export default function Materials() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        kode_bahan: '',
        nama_bahan: '',
        satuan: '',
        custom_satuan: ''
    });
    const [customSatuan, setCustomSatuan] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'id', name: '#' },
        { id: 'kode_bahan', name: 'Kode Bahan Baku' },
        { id: 'nama_bahan', name: 'Nama Bahan Baku' },
        { id: 'jumlah', name: 'Jumlah' },
        { id: 'satuan', name: 'Satuan' },
        { id: 'action', name: 'Action' }
    ];

    const rows = [
        { id: '1', kode_bahan: 'BRG001', nama_bahan: 'Akrilik', jumlah: '47', satuan: 'Lembar', action: '' },
        { id: '2', kode_bahan: 'BRG002', nama_bahan: 'Lampu', jumlah: '123', satuan: 'Pcs', action: '' },
        { id: '3', kode_bahan: 'BRG003', nama_bahan: 'Kabel', jumlah: '15', satuan: 'Meter', action: '' },
        { id: '4', kode_bahan: 'BRG004', nama_bahan: 'Kain', jumlah: '100', satuan: 'Meter', action: '' },
        { id: '5', kode_bahan: 'BRG005', nama_bahan: 'Kertas', jumlah: '500', satuan: 'Lembar', action: '' },
        { id: '6', kode_bahan: 'BRG006', nama_bahan: 'Keramik', jumlah: '100', satuan: 'Meter', action: '' },
        { id: '7', kode_bahan: 'BRG007', nama_bahan: 'Kaca', jumlah: '50', satuan: 'Meter', action: '' },
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
            kode_bahan: '',
            nama_bahan: '',
            satuan: '',
            custom_satuan: ''
        });
        setCustomSatuan(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'satuan' && value === 'custom') {
            setCustomSatuan(true);
        } else if (name === 'satuan') {
            setCustomSatuan(false);
            setFormData({ ...formData, custom_satuan: '' });
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleCustomSatuanChange = (event) => {
        setFormData({ ...formData, custom_satuan: event.target.value, satuan: event.target.value });
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
        row.kode_bahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.nama_bahan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <FolderCog className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Data Bahan Baku</h2>
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
                                                            onClick={() => handleEdit(row.kode_bahan)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            className='bg-red-400 hover:bg-red-500 cursor-pointer text-custom-jhitam font-semibold'
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<Trash2 className='w-4 h-4' />}
                                                            onClick={() => handleDelete(row.kode_bahan)}
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
                <DialogTitle>Tambah Bahan Baku</DialogTitle>
                <DialogContent>
                    <DialogContentText className='mb-8'>
                        Tambahan data bahan baku baru
                    </DialogContentText>
                    <TextField className='mb-4'
                        autoFocus
                        name="kode_bahan"
                        placeholder="Kode Bahan Baku"
                        type="text"
                        variant='filled'
                        value={formData.kode_bahan}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField className='mb-4'
                        name="nama_bahan"
                        placeholder='Nama Bahan Baku'
                        type="text"
                        variant='filled'
                        value={formData.nama_bahan}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl className='mb-4' variant="filled" fullWidth>
                        <InputLabel id="satuan-label">Satuan</InputLabel>
                        <Select
                            labelId="satuan-label"
                            id="satuan"
                            name="satuan"
                            value={customSatuan ? "custom" : formData.satuan}
                            onChange={handleChange}
                        >
                            <MenuItem value="pcs">Pcs</MenuItem>
                            <MenuItem value="meter">Meter</MenuItem>
                            <MenuItem value="lembar">Lembar</MenuItem>
                            <MenuItem value="custom">Custom</MenuItem>
                        </Select>
                    </FormControl>
                    {customSatuan && (
                        <TextField
                            name="custom_satuan"
                            placeholder='Masukkan satuan custom'
                            type="text"
                            variant='filled'
                            value={formData.custom_satuan}
                            onChange={handleCustomSatuanChange}
                            fullWidth
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Batal</Button>
                    <Button onClick={handleSubmit} color='primary'>Simpan</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
