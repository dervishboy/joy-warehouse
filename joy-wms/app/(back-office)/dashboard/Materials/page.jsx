"use client";

import React, { useEffect, useState } from 'react';
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
    InputAdornment
} from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, FolderCog } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Materials() {
    const router = useRouter();

    const [materials, setMaterials] = useState([]);
    const [totalMaterials, setTotalMaterials] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'index', name: '#' },
        { id: 'kode_material', name: 'Kode Material' },
        { id: 'nama_material', name: 'Nama Material' },
        { id: 'quantity', name: 'Jumlah' },
        { id: 'satuan', name: 'Satuan' },
        { id: 'action', name: 'Action' }
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

    const handleEdit = (id) => {
        router.push(`/dashboard/Materials/${id}/edit`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/materials/${id}`);
            setMaterials((prevMaterials) => prevMaterials.filter((material) => material.id !== id));
            setTotalMaterials((prevTotal) => prevTotal - 1);
        } catch (error) {
            console.error('Error deleting material:', error);
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

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <FolderCog className='w-8 h-8 mr-2' />
                        <h2 className="text-2xl font-semibold">Data Material</h2>
                    </div>
                    <div className='flex justify-between'>
                        <Button
                            className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
                            variant="outlined"
                            size="medium"
                            startIcon={<CirclePlus className='w-4 h-4' />}
                            onClick={handleTambahMaterial}
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
                                {materials.map((row, index) => (
                                    <TableRow key={row.id}>
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
                                                ) : column.id === 'index' ? (
                                                    page * rowsPerPage + index + 1
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
                        count={totalMaterials}
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