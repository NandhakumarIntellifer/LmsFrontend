import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Link as MuiLink } from '@mui/material';
import { loginUser } from '../api/Accounts';
import { useNavigate, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        const response = await loginUser(email, password);
        if(response.status == "success"){
            setEmail("");
            setPassword("");
            navigate("/dashboard/", { replace: true });
        }else{
            alert(response.message);
        }
    }
    return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
      <Container 
        maxWidth="xs" 
        component={Paper}
        style={{borderRadius:5,paddingTop:1,paddingBottom:20}} 
        sx={{ 
            boxShadow:{xs:"0 0 2px rgba(0,0,0,0.5)", md:"0 0 2px rgba(0,0,0,0.5)"},
            maxWidth:{xs:"95%", md:"40%", lg:"40%"} }}>
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid container justify="space-between" flexDirection="column" mb={2}>
                    <Typography component="h2" variant="b" align="left">Login</Typography>
                    <Typography component="p" variant="p" align="left">Leave Management System</Typography>
                </Grid>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        LOGIN
                    </Button>
                </Box>
            </Box>
        <Typography component="h6" align="center">
            <Link to="/register" style={{color:"inherit"}}>
                <Typography>
                    Don't have an account? <b>Go to Signup page</b>
                </Typography>
            </Link>
        </Typography>
      </Container>
    </div>
    );
};

export default LoginPage;
