"use client";

import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Snackbar, SnackbarContent } from "@mui/material";
import { Plus, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const roleLabels = {
    ADMIN: 'Admin',
    // STAFF_GUDANG: 'Staff Gudang',
};

const roleOptions = Object.entries(roleLabels).map(([value, label]) => ({
    value,
    label,
}));

export default function TambahUser() {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users',
                {
                    name: formValues.name,
                    email: formValues.email,
                    role: formValues.role,
                    password: formValues.password,
                }
            );
            if (response.status === 201) {
                setSnackbarSeverity('success');
                setSnackbarMessage('Data User berhasil ditambahkan!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    router.push('/dashboard/Users');
                }, 2000);
            }
        }
        catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Terjadi kesalahan saat menambahkan data!');
            setSnackbarOpen(true);
            console.error('Error in handleSubmit:', error);
        };
    };

    const handleBack = () => {
        router.push('/dashboard/Users');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth>
            <Paper className="p-4 mt-4">
                <div className="mb-4">
                    <Typography variant="h4" className="flex items-center mb-4 text-2xl font-semibold">
                        Tambah User
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Nama :</Typography>
                            <TextField
                                fullWidth
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Email :</Typography>
                            <TextField
                                fullWidth
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>Role :</Typography>
                            <FormControl variant="outlined" size='small' fullWidth>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={formValues.role}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {roleOptions.map((role) => (
                                        <MenuItem key={role.value} value={role.value}>
                                            {role.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Password :</Typography>
                            <TextField
                                fullWidth
                                name="password"
                                type="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Confirm Password :</Typography>
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                type="password"
                                value={formValues.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="flex justify-end space-x-2">
                            <Button
                                variant="contained"
                                color="secondary"
                                size='small'
                                onClick={handleBack}
                                startIcon={<ArrowLeft className='w-4 h-4' />}
                            >
                                Kembali
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size='small'
                                type="submit"
                                startIcon={<Plus className='w-4 h-4' />}
                            >
                                Tambah
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
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
        </Container>
    );
}
