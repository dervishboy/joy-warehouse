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
        <div className='px-3 py-4'>
            <Paper className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Tambah User</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            Nama :
                        </Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Email :</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className='mb-2'>Role :</Typography>
                        <FormControl variant="outlined" size='small' fullWidth>
                            <InputLabel id="role-label"></InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
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
                        <Typography>Password :</Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Confirm Password :</Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <div className="flex justify-end mt-8">
                    <Button onClick={handleCancel} color="secondary" className='mr-2'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </div>
            </Paper>
        </div>
    );
}
