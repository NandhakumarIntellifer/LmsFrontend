import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Link as MuiLink  } from '@mui/material';
import { registerUser } from '../api/Accounts';
import { useNavigate, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleRegister(e){
        e.preventDefault();
        const response = await registerUser(username, email, password, password);

        if (response.status == "success"){
            navigate("/login", { replace: true })
        }
        else if(response.status == "failed"){
            setUsername("");
            setEmail("");
            setPassword("");
            alert(response.message);
        }
    }

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
        <Container 
          maxWidth="xs" 
          style={{borderRadius:5,paddingTop:1,paddingBottom:20}} 
          component={Paper}
          sx={{ 
              boxShadow:{xs:"0 0 2px rgba(0,0,0,0.5)", md:"0 0 2px rgba(0,0,0,0.5)"},
              maxWidth:{xs:"95%", md:"50%", lg:"40%"} }}>
              <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Grid container justify="space-between" flexDirection="column" mb={2}>
                      <Typography component="h2" variant="b" align="left">Register</Typography>
                      <Typography component="p" variant="p" align="left">Leave Management System</Typography>
                  </Grid>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
            <Typography component="h6" align="center">
                <Link to="/login" style={{color:"inherit"}}>
                    <Typography>
                        Already have an account? <b>Go to Login page</b>
                    </Typography>
                </Link>
            </Typography>
      </Container>
    </div>
    );
};

export default RegisterPage;
