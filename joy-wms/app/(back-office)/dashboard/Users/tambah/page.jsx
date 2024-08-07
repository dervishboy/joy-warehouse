"use client";

import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Container, Typography, Paper, Grid } from "@mui/material";
import { useRouter } from 'next/navigation';

const roles = [
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Staff Gudang', label: 'Staff Gudang' },
    { value: 'Staff Produksi', label: 'Staff Produksi' },
];

export default function AddUser() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        // Handle save logic here, e.g., send data to API
        console.log({ name, email, role, password, confirmPassword });
        router.push('/dashboard/Users');
    };

    const handleCancel = () => {
        router.push('/dashboard/Users');
    };

    return (
        <Container component="main" maxWidth>
            <Paper elevation={3} className="p-4 mt-4">
                <Typography className='text-2xl font-semibold mb-4'>
                    Tambah User
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                label="Role"
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <div className="flex justify-end mt-4">
                    <Button onClick={handleCancel} color="secondary" className='mr-2'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </div>
            </Paper>
        </Container>
    );
}
