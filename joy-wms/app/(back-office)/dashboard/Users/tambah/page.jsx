"use client";

import React, { useState } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function TambahUser() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        router.push('/dashboard/Users');
    };

    return (
        <div className='px-3 py-4'>
            <Paper className='p-4'>
                <Typography className='text-2xl font-semibold mb-8 mt-4'>
                    Tambah User
                </Typography>
                <form onSubmit={handleSubmit} className='ml-2'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Nama :
                            </Typography>
                            <TextField
                                fullWidth
                                variant='filled'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Email :
                            </Typography>
                            <TextField
                                fullWidth
                                variant='filled'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Role :
                            </Typography>
                            <FormControl fullWidth variant='outlined' size='small'>
                                <Select
                                    name='role'
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='user'>User</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Password :
                            </Typography>
                            <TextField
                                fullWidth
                                variant='filled'
                                type='password'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className='mb-2'>
                                Konfirmasi Password :
                            </Typography>
                            <TextField
                                fullWidth
                                variant='filled'
                                type='password'
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className='text-right space-x-2'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                            >
                                Submit
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => router.push('/dashboard/Users')}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}
