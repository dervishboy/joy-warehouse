"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, TablePagination, InputAdornment } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, Anvil, BookUser } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Produk() {
    const router = useRouter();
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

    const handleDetail = (id) => {
        router.push(`/dashboard/Produk/${id}/detail`);
    };

    const handleDelete = (id) => {
        console.log(`Delete row with id ${id}`);
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
                    <div className='text-right'>
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
                                                            className="bg-rose-400 hover:bg-red-600 cursor-pointer text-custom-jhitam font-semibold"
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<Trash2 />}
                                                            onClick={() => handleDelete(row.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            className="bg-teal-400 hover:bg-teal-500 cursor-pointer text-custom-jhitam font-semibold"
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<BookUser />}
                                                            onClick={() => handleDetail(row.id)}
                                                        >
                                                            Lihat Detail
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
        </div>
    );
}
