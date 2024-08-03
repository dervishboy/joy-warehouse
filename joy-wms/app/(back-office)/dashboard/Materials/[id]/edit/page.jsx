"use client"

import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, TablePagination, InputAdornment } from "@mui/material";
import { CirclePlus, Pencil, Trash2, Search, FolderCog } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditMaterials() {
    return (
        <Paper>
            <h1>Edit Materials</h1>
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
                startIcon={<FolderCog />}
            >
                Update
            </Button>
        </Paper>
    );
}