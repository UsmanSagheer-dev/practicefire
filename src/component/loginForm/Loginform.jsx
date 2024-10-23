import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, CssBaseline } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../../config/firebase';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Error signing in:", error.code, error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 8,
          p: 2,
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5">Facebook</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Log into your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Log In
          </Button>
        </form>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          <a href="#" style={{ textDecoration: 'none' }}>Forgot password?</a>
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
