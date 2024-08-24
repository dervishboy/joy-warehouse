"use client";

import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, FormControl, Select, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

const roleLabels = {
    ADMIN: 'Admin',
    STAFF_GUDANG: 'Staff Gudang',
};

const roleOptions = Object.entries(roleLabels).map(([value, label]) => ({
    value,
    label,
}));

export default function EditUser() {
    const router = useRouter();
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        role: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`);
            setFormValues({
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
            });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleTogglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updateData = {
                name: formValues.name,
                email: formValues.email,
                role: formValues.role,
            };

            if (formValues.oldPassword && formValues.newPassword === formValues.confirmPassword) {
                updateData.oldPassword = formValues.oldPassword;
                updateData.newPassword = formValues.newPassword;
            }

            const response = await axios.put(`http://localhost:5000/api/users/${id}`, updateData);
            if (response.status === 200) {
                router.push('/dashboard/Users');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleBack = () => {
        router.push('/dashboard/Users');
    };

    return (
        <Container maxWidth>
            <Paper className="p-4 mt-4">
                <div className="mb-4">
                    <Typography variant="h4" className="flex items-center mb-4 text-2xl font-semibold">
                        Edit User
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>Nama :</Typography>
                            <TextField
                                fullWidth
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Masukkan nama"
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
                                placeholder="Masukkan email"
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
                            <Typography>Password Lama :</Typography>
                            <TextField
                                fullWidth
                                name="oldPassword"
                                type={showPassword.oldPassword ? 'text' : 'password'}
                                value={formValues.oldPassword}
                                onChange={handleInputChange}
                                placeholder="Masukkan password lama"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleTogglePasswordVisibility('oldPassword')}
                                                edge="end"
                                            >
                                                {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Password Baru :</Typography>
                            <TextField
                                fullWidth
                                name="newPassword"
                                type={showPassword.newPassword ? 'text' : 'password'}
                                value={formValues.newPassword}
                                onChange={handleInputChange}
                                placeholder="Masukkan password baru (opsional)"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleTogglePasswordVisibility('newPassword')}
                                                edge="end"
                                            >
                                                {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Konfirmasi Password Baru :</Typography>
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                value={formValues.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Konfirmasi password baru"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleTogglePasswordVisibility('confirmPassword')}
                                                edge="end"
                                            >
                                                {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} className="flex justify-end space-x-2">
                            <Button
                                variant="contained"
                                color="secondary"
                                size='small'
                                onClick={handleBack}
                            >
                                Kembali
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size='small'
                                type="submit"
                            >
                                Simpan
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
