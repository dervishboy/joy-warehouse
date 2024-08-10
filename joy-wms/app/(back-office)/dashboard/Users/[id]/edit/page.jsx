"use client";

import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
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
        password: '',
        confirmPassword: '',
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${id}`, {
                name: formValues.name,
                email: formValues.email,
                role: formValues.role,
                password: formValues.password
            });
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
