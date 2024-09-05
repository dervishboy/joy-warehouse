"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    TablePagination,
    InputAdornment,
    Snackbar,
    SnackbarContent
} from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, FolderCog, Printer, FileClock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

const formatAngkaMaterial = (angka) => {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function Materials() {
    const router = useRouter();
    const printRef = useRef(null);

    const [materials, setMaterials] = useState([]);
    const [allMaterials, setAllMaterials] = useState([]);
    const [totalMaterials, setTotalMaterials] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const columns = [
        { id: 'index', name: 'No' },
        { id: 'kode_material', name: 'Kode Material' },
        { id: 'nama_material', name: 'Nama Material' },
        { id: 'quantity', name: 'Jumlah' },
        { id: 'satuan', name: 'Satuan' },
        { id: 'actions', name: 'Actions' }
    ];

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/materials', {
                    params: {
                        searchQuery: searchTerm,
                        page,
                        rowsPerPage
                    }
                });
                setMaterials(response.data.materials);
                setTotalMaterials(response.data.totalMaterials);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterials();
    }, [searchTerm, page, rowsPerPage]);

    useEffect(() => {
        const fetchAllMaterials = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/materials?rowsPerPage=-1');
                setAllMaterials(response.data.materials);
            } catch (error) {
                console.error('Error fetching all materials:', error);
            }
        };
        fetchAllMaterials();
    }, []);


    const handleEdit = (id) => {
        router.push(`/dashboard/Materials/${id}/edit`);
    };

    const handleDelete = async (id) => {
        const shouldDelete = confirm('Apakah anda yakin ingin menghapus material ini? Stock material juga akan terhapus.');
        if (shouldDelete) {
            axios.delete(`http://localhost:5000/api/materials/${id}`)
                .then(() => {
                    const updatedMaterials = materials.filter(material => material.id !== id);
                    setMaterials(updatedMaterials);
                    setTotalMaterials(totalMaterials - 1);
                    setSnackbarMessage('Material berhasil dihapus.');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                })
                .catch((error) => {
                    console.error('Error deleting material:', error);
                    setSnackbarMessage('Gagal menghapus material.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        }
    };

    const handleTambahMaterial = () => {
        router.push('/dashboard/Materials/tambah');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                        <FolderCog className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Data Material</h2>
                    </div>
                    <div className='flex justify-between'>
                        <div className='space-x-2'>
                            <Button
                                className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                                variant="outlined"
                                size="medium"
                                startIcon={<CirclePlus className='w-4 h-4' />}
                                onClick={handleTambahMaterial}
                            >
                                Tambah
                            </Button>
                            <ReactToPrint
                                trigger={() => (
                                    <Button
                                        className='bg-blue-300 hover:bg-blue-500 cursor-pointer text-custom-jhitam font-semibold'
                                        variant="outlined"
                                        size="medium"
                                        startIcon={<Printer className='w-4 h-4' />}
                                    >
                                        Cetak
                                    </Button>
                                )}
                                content={() => printRef.current}
                                onAfterPrint={() => console.log('Print finished!')}
                            />
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
                    <TableContainer sx={{ maxHeight: 500 }} ref={printRef}>
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
                                {materials.map((row, index) => (
                                    <TableRow key={row.id}>
                                        {columns.map((column) => (
                                            <TableCell className='text-sm font-semibold text-center' key={column.id}>
                                                {column.id === 'index' ? index + 1 : column.id === 'quantity' ? formatAngkaMaterial(row[column.id]) : row[column.id]}
                                                {column.id === 'actions' && (
                                                    <div className='flex justify-center space-x-2'>
                                                        <Button
                                                            className='bg-amber-400 hover:bg-amber-500 cursor-pointer text-custom-jhitam font-semibold'
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={<FileClock className='w-4 h-4' />}
                                                        >
                                                            Kartu Stok
                                                        </Button>
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
                        count={totalMaterials}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <div style={{ display: 'none' }}>
                <Paper ref={printRef}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns
                                        .filter(column => column.id !== 'actions')
                                        .map((column) => (
                                            <TableCell className="bg-custom-jhitam text-custom-jputih font-semibold" key={column.id}>
                                                {column.name}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allMaterials.map((row, index) => (
                                    <TableRow key={row.id}>
                                        {columns
                                            .filter(column => column.id !== 'actions')
                                            .map((column) => (
                                                <TableCell key={column.id}>
                                                    {column.id === 'index' ? index + 1 : column.id === 'quantity' ? formatAngkaMaterial(row[column.id]) : row[column.id]}
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
