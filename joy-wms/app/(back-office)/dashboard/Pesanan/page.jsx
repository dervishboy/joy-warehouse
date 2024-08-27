"use client";

import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination, InputAdornment, TextField, Snackbar, SnackbarContent } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, ShoppingBasket, BookUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(amount);
};

export default function Pesanan() {
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const columns = [
        { id: 'index', name: 'No' },
        { id: 'nama_pemesan', name: 'Nama Pemesan' },
        { id: 'kode_pesanan', name: 'Kode Pesanan' },
        { id: 'totalHarga', name: 'Total Harga' },
        { id: 'status', name: 'Status' },
        { id: 'actions', name: 'Actions' }
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', {
                    params: {
                        searchQuery: searchTerm,
                        page,
                        rowsPerPage
                    }
                });
                setOrders(response.data.orders);
                setTotalOrders(response.data.totalOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [searchTerm, page, rowsPerPage]);

    const handleDelete = (id) => {
        const shouldDelete = window.confirm('Apakah anda yakin ingin menghapus pesanan ini?');
        if (shouldDelete) {
            axios.delete(`http://localhost:5000/api/orders/${id}`)
                .then(() => {
                    const updatedOrders = orders.filter((order) => order.id !== id);
                    setOrders(updatedOrders);
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Pesanan berhasil dihapus');
                    setSnackbarOpen(true);
                })
                .catch((error) => {
                    console.error('Error deleting order:', error);
                    setSnackbarSeverity('error');
                    setSnackbarMessage(`Gagal menghapus pesanan: ${error.message}`);
                    setSnackbarOpen(true);
                });
        }
    };

    const handleAdd = () => {
        router.push(`/dashboard/Pesanan/tambah`);
    };

    const handleDetail = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
            if (response.data.status === 'CANCELLED') {
                alert('Pesanan telah dibatalkan');
            } else {
                router.push(`/dashboard/Pesanan/${id}/detail`);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
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
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

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
                                {orders.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell className='text-sm font-semibold text-center'>{index + 1}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{row.nama_pemesan}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{row.kode_pesanan}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{formatRupiah(row.totalHarga)}</TableCell>
                                        <TableCell className="text-sm font-semibold text-center">
                                            <span className={`rounded-md p-1 border border-neutral-800 text-sm font-semibold ${row.status === 'PROCESSING' ? 'bg-yellow-400' :
                                                    row.status === 'DONE' ? 'bg-green-400' :
                                                        'bg-red-400'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className='items-center space-x-2 text-center'>
                                            {/* <Button
                                                className="bg-teal-400 hover:bg-teal-500 cursor-pointer text-custom-jhitam font-semibold"
                                                variant="outlined"
                                                size="small"
                                                startIcon={<Pencil />}
                                                onClick={() => handleEdit(row.id)}
                                            >
                                                Edit
                                            </Button> */}
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
                        count={totalOrders}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336',
                    }}
                    message={snackbarMessage}
                />
            </Snackbar>
        </div>
    );
}
