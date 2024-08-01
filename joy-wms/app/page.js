"use client";

import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, AlertTitle, AlertDescription, InputAdornment, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Lock, VisibilityOff, Visibility, Person, ErrorOutline } from '@mui/icons-material';
import Image from 'next/image';


export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('role', 'admin');
      router.push('/dashboard/admin');
    } else if (username === 'staff' && password === 'password') {
      localStorage.setItem('role', 'staff');
      router.push('/dashboard/staff');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <form onSubmit={(e) => e.preventDefault()} className='mt-12'>
              <TextField
                fullWidth
                margin="normal"
                placeholder='Username'
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder='Password'
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize='small'/>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{ marginTop: 8, background: 'linear-gradient(180deg, #F59549, #F8B177 )' }}
                className='hover:bg-orange-500 text-custom-jhitam font-semibold'
              >
                Login
              </Button>

              {error && (
                <Alert severity="error" sx={{ marginTop: 16 }}>
                  <ErrorOutline fontSize="inherit" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
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
    </Box>
  );
}
