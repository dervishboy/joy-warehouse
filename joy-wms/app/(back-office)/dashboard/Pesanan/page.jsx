"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, InputAdornment, TextField } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, ShoppingBasket, BookUser } from 'lucide-react';
import { useRouter } from 'next/navigation';

const dummyData = [
    { id: 1, kode_pesanan: 'PSN-001', qty: 1, total_harga: 100000, status: 'Pending', id_produk: 1, nama_produk: 'Produk A', deskripsi_produk: 'Deskripsi Produk A', estimasi_waktu_pengerjaan: '2 hari' },
    { id: 2, kode_pesanan: 'PSN-002', qty: 2, total_harga: 200000, status: 'Done', id_produk: 2, nama_produk: 'Produk B', deskripsi_produk: 'Deskripsi Produk B', estimasi_waktu_pengerjaan: '3 hari' },
];

export default function Pesanan() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const router = useRouter();

    const columns = [
        { id: 'kode_pesanan', name: 'Kode Pesanan' },
        { id: 'qty', name: 'Qty' },
        { id: 'total_harga', name: 'Total Harga' },
        { id: 'status', name: 'Status' },
        { id: 'action', name: 'Action' }
    ];

    const handleEdit = (id) => {
        router.push(`/dashboard/Pesanan/${id}/edit`);
    };

    const handleDelete = (id) => {
        console.log(`Delete row with id ${id}`);
    };

    const handleAdd = () => {
        router.push(`/dashboard/Pesanan/tambah`);
    };

    const handleDetail = (id) => {
        router.push(`/dashboard/Pesanan/${id}/detail`);
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

    const filteredRows = dummyData.filter((row) =>
        row.kode_pesanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <ShoppingBasket className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Data Pesanan</h2>
                    </div>
                    <div className='flex justify-between'>
                        <Button
                            className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                            variant="outlined"
                            size="medium"
                            startIcon={<CirclePlus className='w-4 h-4' />}
                            onClick={handleAdd}
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
                                    <TableRow key={row.id}>
                                        <TableCell className="text-sm font-semibold text-center">{row.kode_pesanan}</TableCell>
                                        <TableCell className="text-sm font-semibold text-center">{row.qty}</TableCell>
                                        <TableCell className="text-sm font-semibold text-center">{row.total_harga}</TableCell>
                                        <TableCell className="text-sm font-semibold text-center">{row.status}</TableCell>
                                        <TableCell className="items-center space-x-2 text-center">
                                            <Button
                                                className="bg-teal-400 hover:bg-teal-500 cursor-pointer text-custom-jhitam font-semibold"
                                                variant="outlined"
                                                size="small"
                                                startIcon={<Pencil />}
                                                onClick={() => handleEdit(row.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className="bg-rose-400 hover:bg-red-600 cursor-pointer text-custom-jhitam font-semibold"
                                                variant="outlined"
                                                size="small"
                                                startIcon={<Trash2 />}
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                className="bg-sky-500 hover:bg-sky-600 cursor-pointer text-custom-jhitam font-semibold"
                                                variant="outlined"
                                                size="small"
                                                startIcon={<BookUser />}
                                                onClick={() => handleDetail(row.id)}
                                            >
                                                Lihat Detail
                                            </Button>
                                        </TableCell>
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
