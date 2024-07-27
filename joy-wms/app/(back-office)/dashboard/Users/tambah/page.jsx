"use client";

import React, { useState } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from "@mui/material";
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
                <Paper className="p-4">
                <Typography variant="h5" component="h2" gutterBottom>
                    Tambah User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} className="text-right space-x-2">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
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
