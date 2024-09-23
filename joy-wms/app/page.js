"use client";

import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, InputAdornment, IconButton, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Lock, Person } from '@mui/icons-material';
import Image from 'next/image';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email && !password) {
      setError('Harap masukkan email dan kata sandi.');
      setSnackbarOpen(true);
      return;
    }

    if (!email) {
      setError('Harap masukkan email.');
      setSnackbarOpen(true);
      return;
    }

    if (!password) {
      setError('Harap masukkan kata sandi.');
      setSnackbarOpen(true);
      return;
    }

    if (!validateEmail(email)) {
      setError('Format email tidak valid.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      } else {
        setError('Email atau kata sandi salah.');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error(err);

      const errorMessage = err.response?.data?.message;
      let translatedError = 'Terjadi kesalahan. Silakan coba lagi.';

      if (errorMessage === 'User does not exist') {
        translatedError = 'Login gagal, email atau kata sandi salah';
      } else if (errorMessage === 'Invalid password') {
        translatedError = 'Kata sandi tidak valid.';
      } else if (errorMessage === 'Email atau kata sandi salah.') {
        translatedError = 'Email atau kata sandi salah.';
      } else if (errorMessage === 'Please enter all fields') {
        translatedError = 'Harap masukkan semua kolom.';
      } else if (errorMessage === 'Invalid credentials') {
        translatedError = 'Login gagal, email atau kata sandi salah.';
      }

      setError(translatedError);
      setSnackbarOpen(true);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', background: 'linear-gradient(180deg, #F8B177, #FBD8BB, #FEF2E8)' }}
    >
      <Box boxShadow={3} display="flex" borderRadius={2} overflow="hidden">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 400, height: 512, padding: 4 }}
          className="bg-custom-jputih"
        >
          <Box width={300} textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom className='font-semibold text-custom-jhitam'>
              Login
            </Typography>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }} className='mt-12'>
              <TextField
                fullWidth
                margin="normal"
                placeholder='Email'
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize='small' />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                placeholder='Kata Sandi'
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize='small' />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ marginTop: 8, background: 'linear-gradient(180deg, #F59549, #F8B177 )' }}
                className='hover:bg-orange-500 text-custom-jhitam font-semibold'
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 400, height: 512, background: 'linear-gradient(180deg, #F59549, #F8B177, #FBD8BB )' }}
        >
          <Image
            src="/logoo.png"
            alt="Login Banner"
            width={200} height={200}
          />
          <Typography variant="h6" className='mt-4 font-semibold text-custom-jhitam text-center'>
            Joy Warehouse Management System
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ backgroundColor: '#f44336', color: '#fff' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
