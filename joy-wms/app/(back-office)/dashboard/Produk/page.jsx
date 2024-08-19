"use client";

import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, TablePagination, InputAdornment } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, Anvil, BookUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Produk() {
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'index', name: '#' },
        { id: 'kode_produk', name: 'Kode Produk' },
        { id: 'nama_produk', name: 'Nama Produk' },
        { id: 'deskripsi', name: 'Deskripsi' },
        { id: 'actions', name: 'Actions' }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: {
                        searchQuery: searchTerm,
                        page,
                        rowsPerPage
                    }
                });
                setProducts(response.data.products);
                setTotalProducts(response.data.totalProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [searchTerm, page, rowsPerPage]);

    const handleDetail = (id) => {
        router.push(`/dashboard/Produk/${id}/detail`);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

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
                                {products.map((product, index) => (
                                    <TableRow key={product.id} hover>
                                        <TableCell className='text-sm font-semibold text-center'>{index + 1}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{product.kode_produk}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{product.nama_produk}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{product.deskripsi}</TableCell>
                                        <TableCell className='items-center text-center'>
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
                        count={totalProducts}
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
