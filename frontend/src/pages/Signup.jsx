import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Paper,
    Link as MuiLink,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import { toast } from 'react-toastify';
import { playSound } from '../services/audioService';

export default function Signup() {
    const { settings } = useSettings();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        playSound('click');
        try {
            await CyberDB.signup(email, username, password);
            toast.success("PROFILE INITIALIZED. Welcome to CyberQuest.");
            navigate('/');
        } catch (err) {
            playSound('error');
            toast.error(err.message);
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                width: '100vw',
                position: 'relative',
                boxSizing: 'border-box'
            }}
        >
            {/* Header navbar */}
            <AppBar 
                position="static" 
                sx={{ 
                    bgcolor: settings.lightTheme ? 'rgba(255,255,255,0.9)' : 'rgba(8,5,26,0.85)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${settings.lightTheme ? 'rgba(98, 0, 238, 0.2)' : 'rgba(157, 78, 221, 0.25)'}`,
                    boxShadow: 'none'
                }}
            >
                <Toolbar sx={{ px: 2 }}>
                    <IconButton 
                        component={Link} 
                        to="/"
                        sx={{ color: settings.lightTheme ? '#6200ee' : '#00f2ff' }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            ml: 1, 
                            color: settings.lightTheme ? '#1a0b36' : '#ffffff', 
                            fontFamily: 'Roboto',
                            fontWeight: 'bold' 
                        }}
                    >
                        Back to Login
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexGrow: 1, 
                    p: 2,
                    boxSizing: 'border-box'
                }}
            >
                <Paper 
                    className="glass-panel animate-in"
                    elevation={0}
                    sx={{
                        width: '100%',
                        maxWidth: 450,
                        p: { xs: 3, sm: 5 },
                        borderWidth: 2,
                        borderRadius: 3,
                        borderColor: settings.lightTheme ? 'rgba(98,0,238,0.3)' : '#9d4edd',
                        background: settings.lightTheme ? 'rgba(255,255,255,0.85)' : 'rgba(20,15,45,0.6)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: settings.lightTheme ? '0 8px 32px 0 rgba(98, 0, 238, 0.15)' : '0 8px 32px 0 rgba(157, 78, 221, 0.3)',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Box textAlign="center" mb={4}>
                        <Typography 
                            variant="h4" 
                            className="cyber-header float-anim"
                            sx={{ 
                                fontSize: { xs: '1.8rem', sm: '2.2rem' }, 
                                fontWeight: 'bold',
                                color: settings.lightTheme ? '#6200ee' : '#9d4edd'
                            }}
                        >
                            CREATE PROFILE
                        </Typography>
                        <Typography 
                            variant="caption" 
                            color="textSecondary"
                            sx={{ letterSpacing: 1.5, display: 'block', mt: 1, fontWeight: 'bold' }}
                        >
                            INITIALIZE YOUR CYBERQUEST AGENT IDENTITY
                        </Typography>
                    </Box>

                    <form onSubmit={handleSignupSubmit}>
                        <Box display="flex" flexDirection="column" gap={3}>
                            <TextField
                                label="Registered Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{
                                    sx: { color: settings.lightTheme ? '#6200ee' : '#9d4edd' }
                                }}
                                InputProps={{
                                    sx: { 
                                        color: 'inherit',
                                        bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(255,255,255,0.05)',
                                        borderRadius: 2 
                                    }
                                }}
                            />

                            <TextField
                                label="Agent Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                fullWidth
                                variant="outlined"
                                placeholder="Enter codename..."
                                InputLabelProps={{
                                    sx: { color: settings.lightTheme ? '#6200ee' : '#9d4edd' }
                                }}
                                InputProps={{
                                    sx: { 
                                        color: 'inherit',
                                        bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(255,255,255,0.05)',
                                        borderRadius: 2 
                                    }
                                }}
                            />

                            <TextField
                                label="Create Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                variant="outlined"
                                placeholder="••••••••"
                                InputLabelProps={{
                                    sx: { color: settings.lightTheme ? '#6200ee' : '#9d4edd' }
                                }}
                                InputProps={{
                                    sx: { 
                                        color: 'inherit',
                                        bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(255,255,255,0.05)',
                                        borderRadius: 2 
                                    }
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontFamily: 'Roboto',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    bgcolor: settings.lightTheme ? '#6200ee' : '#9d4edd',
                                    '&:hover': {
                                        bgcolor: '#ffffff',
                                        color: '#000000',
                                        boxShadow: settings.lightTheme ? 'none' : '0 0 20px #9d4edd'
                                    }
                                }}
                            >
                                Initialize Account
                            </Button>
                        </Box>
                    </form>

                    <Box textAlign="center" mt={4}>
                        <Typography variant="body2" color="textSecondary">
                            Already an active agent?{' '}
                            <MuiLink 
                                component={Link} 
                                to="/" 
                                sx={{ 
                                    color: settings.lightTheme ? '#6200ee' : '#00f2ff', 
                                    textDecoration: 'none', 
                                    fontWeight: 'bold',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Login Here
                            </MuiLink>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
