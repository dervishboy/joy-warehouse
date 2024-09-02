"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Snackbar, SnackbarContent, CircularProgress, Box } from '@mui/material';

const Auth = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token && pathname !== '/') {
            setSnackbarSeverity('error');
            setSnackbarMessage('Harap login terlebih dahulu.');
            setSnackbarOpen(true);
            setTimeout(() => {
                router.push('/');
            }, 500);
        } else {
            setLoading(false);
        }
    }, [router, pathname]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                sx={{ background: 'linear-gradient(180deg, #F8B177, #FBD8BB, #FEF2E8)' }}
            >
                <CircularProgress />
            </Box>
        );
    }

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
