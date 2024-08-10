"use client";

import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, TablePagination, InputAdornment } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, BookUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Users() {
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const columns = [
        { id: 'id', name: '#' },
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'role', name: 'Role' },
        { id: 'action', name: 'Action' }
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users', {
                    params: {
                        searchQuery: searchTerm,
                        page,
                        rowsPerPage
                    }
                });
                setUsers(response.data.users);
                setTotalUsers(response.data.totalUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [searchTerm, page, rowsPerPage]);

    const handleEdit = (id) => {
        router.push(`/dashboard/Users/${id}/edit`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAdd = () => {
        router.push(`/dashboard/Users/tambah`);
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

    const formatRole = (role) => {
        switch (role) {
            case 'ADMIN':
                return 'Admin';
            case 'STAFF_GUDANG':
                return 'Staff Gudang';
            default:
                return role;
        }
    };

    return (
        <div className='px-3 py-4'>
            <div className="px-4 py-4">
                <div className="mb-2">
                    <div className='flex items-center mb-4'>
                        <BookUser className='w-8 h-8 mr-2'/>
                        <h2 className="text-2xl font-semibold">Data User</h2>
                    </div>
                    <div className='flex justify-between'>
                        <Button className='bg-custom-jorange hover:bg-orange-500 cursor-pointer text-custom-jhitam font-semibold'
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
                                {users.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell className='text-sm font-semibold text-center'>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{row.name}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{row.email}</TableCell>
                                        <TableCell className='text-sm font-semibold text-center'>{formatRole(row.role)}</TableCell>
                                        <TableCell className='items-center space-x-2 text-center'>
                                            <Button className='bg-teal-400 hover:bg-teal-500 cursor-pointer text-custom-jhitam font-semibold'
                                                variant="contained"
                                                size="small"
                                                startIcon={<Pencil className='w-4 h-4' />}
                                                onClick={() => handleEdit(row.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button className='bg-rose-400 hover:bg-red-600 cursor-pointer text-custom-jhitam font-semibold'
                                                variant="contained"
                                                size="small"
                                                startIcon={<Trash2 className='w-4 h-4' />}
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                Delete
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
                        count={totalUsers}
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
