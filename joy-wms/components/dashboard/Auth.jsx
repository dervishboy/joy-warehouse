"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

const Auth = ({ children }) => {
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Harap login terlebih dahulu.');
            setSnackbarOpen(true);
            setTimeout(() => {
                router.push('/');
            }, 500);
        }
    }, [router]);

    return (
        <>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <SnackbarContent
                    sx={{ backgroundColor: snackbarSeverity === 'error' ? 'red' : 'green' }}
                    message={snackbarMessage}
                />
            </Snackbar>
        </>
    );
};

export default Auth;
