"use client";

import { Container, Grid, Typography, Button, TextField, Box } from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Website
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          We provide the best solutions for your business needs.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Box>
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our company specializes in providing high-quality products and services to meet the unique needs of our clients.
        </Typography>
      </Box>
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="message"
                name="message"
                label="Message"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
