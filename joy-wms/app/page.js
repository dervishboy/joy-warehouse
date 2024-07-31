"use client";

import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Alert, AlertTitle, AlertDescription } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AlertCircle } from '@mui/icons-material';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('role', 'admin');
      router.push('/dashboard/admin');
    } else if (username === 'staff' && password === 'password') {
      localStorage.setItem('role', 'staff');
      router.push('/dashboard/staff-gudang');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Box boxShadow={3} display="flex" borderRadius={2}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 400, height: 512, bgcolor: 'green.300', borderRadius: '4px 0 0 4px' }}
        >
          <Box width={300} textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Selamat Datang
            </Typography>

            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 16 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ marginTop: 16 }}
              >
                Sign in
              </Button>

              {error && (
                <Alert severity="error" sx={{ marginTop: 16 }}>
                  <AlertCircle fontSize="inherit" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 400, height: 512, borderRadius: '0 4px 4px 0' }}
        >
          <Image
            src="/logo.png"
            alt="Login Banner"
            width={30} height={30}
          />
        </Box>
      </Box>
    </Box>
  );
}
