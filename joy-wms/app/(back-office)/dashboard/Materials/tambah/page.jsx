"use client";

import React from 'react';
import { Paper, TextField, Button, InputAdornment } from '@mui/material';
import { Search, FolderPlus } from 'lucide-react';

export default function TambahMaterial() {
    return (
        <Paper>
            <h1>Tambah Material</h1>
            <TextField
                label="Kode Bahan Baku"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Nama Bahan Baku"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Jumlah"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Satuan"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<FolderPlus />}
            >
                Tambah
            </Button>
        </Paper>
    );
}