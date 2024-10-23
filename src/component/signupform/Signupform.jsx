// SignupForm.js
import React, { useState } from 'react';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { Container, TextField, Button, Typography, Box, CssBaseline, Grid } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth, db } from '../../config/firebase'; // Adjust path as necessary
import { Link } from 'react-router-dom';

export const SignupForm = ({ toggleForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
        const user = userCredential.user;
      
        // Save user information to Firestore with the UID as the document ID
        const docRef = await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          email: user.email, // Store email from the userCredential
        });
      
        console.log("User document written with UID: ", user.uid);
        alert("Sign up successful!");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error signing up: ${errorMessage}`);
        console.error("Error signing up:", errorCode, errorMessage);
      }
      
    
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
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          It's quick and easy.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
