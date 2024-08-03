"use client";

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TablePagination, InputAdornment } from "@mui/material";
import { Plus, Pencil, Trash2, Search, FolderPlus, Printer } from 'lucide-react';

export default function TambahMaterialMasuk() {
    return (
        <Paper>
            <h1>Tambah Material Masuk</h1>
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
                label="Tanggal"
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