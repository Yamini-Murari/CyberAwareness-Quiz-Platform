import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    InputAdornment, 
    IconButton, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    Alert,
    Link as MuiLink,
    Paper
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import SettingsDrawer from '../components/SettingsDrawer';
import { toast } from 'react-toastify';
import { playSound } from '../services/audioService';

export default function Login() {
    const { settings } = useSettings();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Settings drawer inside Login page since it is outside MainLayout
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Forgot Password states
    const [forgotOpen, setForgotOpen] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [accountFound, setAccountFound] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [recoveryStatus, setRecoveryStatus] = useState(null); // { type: 'info'|'success'|'error', text: '' }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        playSound('click');
        try {
            const user = await CyberDB.login(email, password);
            toast.success(`Welcome back, Agent ${user.username.toUpperCase()}.`);
            navigate('/dashboard');
        } catch (err) {
            playSound('error');
            toast.error(err.message);
        }
    };

    const handleFindAccount = async () => {
        playSound('click');
        if (!recoveryEmail) {
            setRecoveryStatus({ type: 'warning', text: 'Please enter registered email.' });
            return;
        }
        
        try {
            const user = await CyberDB.getUser(recoveryEmail);
            if (user) {
                setAccountFound(true);
                setRecoveryStatus({ type: 'info', text: 'Account found. Create a new password below.' });
            } else {
                setAccountFound(false);
                setRecoveryStatus({ type: 'error', text: 'Account not found. Check the email or create a profile.' });
            }
        } catch (e) {
            setRecoveryStatus({ type: 'error', text: 'Error searching for account.' });
        }
    };

    const handleSetNewPassword = async () => {
        playSound('click');
        if (!newPassword || newPassword.length < 4) {
            setRecoveryStatus({ type: 'warning', text: 'Password should be at least 4 characters.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setRecoveryStatus({ type: 'warning', text: 'Passwords do not match.' });
            return;
        }

        try {
            const user = await CyberDB.getUser(recoveryEmail);
            if (user) {
                user.password = newPassword;
                await CyberDB.saveUser(user);
                setRecoveryStatus({ type: 'success', text: 'Password updated. You can close this window and login.' });
                toast.success('Access credentials updated.');
            }
        } catch (e) {
            setRecoveryStatus({ type: 'error', text: 'Failed to update access key.' });
        }
    };

    const handleForgotClose = () => {
        setForgotOpen(false);
        setRecoveryEmail('');
        setAccountFound(false);
        setNewPassword('');
        setConfirmPassword('');
        setRecoveryStatus(null);
    };

    return (
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                width: '100vw',
                px: 2, 
                position: 'relative',
                boxSizing: 'border-box'
            }}
        >
            {/* Header / Settings Toggle on Login Screen */}
            <Box position="absolute" top={20} right={20}>
                <IconButton 
                    onClick={() => setSettingsOpen(true)} 
                    sx={{ color: settings.lightTheme ? '#6200ee' : '#00f2ff' }}
                >
                    <SettingsIcon fontSize="large" />
                </IconButton>
            </Box>

            <Paper 
                className="glass-panel animate-in"
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 400,
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
                        CYBERQUEST
                    </Typography>
                    <Typography 
                        variant="caption" 
                        color="textSecondary"
                        sx={{ letterSpacing: 2, display: 'block', mt: 1, fontWeight: 'bold' }}
                    >
                        SECURE LOGIN TERMINAL
                    </Typography>
                </Box>

                <form onSubmit={handleLoginSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label="Enter Email / Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            autoComplete="username"
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
                            label="Password for Login"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            autoComplete="current-password"
                            InputLabelProps={{
                                sx: { color: settings.lightTheme ? '#6200ee' : '#9d4edd' }
                            }}
                            InputProps={{
                                sx: { 
                                    color: 'inherit',
                                    bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(255,255,255,0.05)',
                                    borderRadius: 2
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: settings.lightTheme ? '#6200ee' : '#9d4edd' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <MuiLink 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setForgotOpen(true); }}
                                sx={{ 
                                    color: settings.lightTheme ? '#6200ee' : '#00f2ff', 
                                    textDecoration: 'none', 
                                    fontSize: '0.85rem',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Forgot Password?
                            </MuiLink>
                        </Box>

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
                            Login to System
                        </Button>
                    </Box>
                </form>

                <Box textAlign="center" mt={4}>
                    <Typography variant="body2" color="textSecondary">
                        New Recruit?{' '}
                        <MuiLink 
                            component={Link} 
                            to="/signup" 
                            sx={{ 
                                color: settings.lightTheme ? '#6200ee' : '#00f2ff', 
                                textDecoration: 'none', 
                                fontWeight: 'bold',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            CREATE PROFILE
                        </MuiLink>
                    </Typography>
                </Box>
            </Paper>

            {/* Forgot Password Modal */}
            <Dialog 
                open={forgotOpen} 
                onClose={handleForgotClose}
                PaperProps={{
                    sx: {
                        bgcolor: settings.lightTheme ? '#ffffff' : '#110a29',
                        color: settings.lightTheme ? '#1a1a1a' : '#ffffff',
                        border: `1px solid ${settings.lightTheme ? 'rgba(98, 0, 238, 0.2)' : 'rgba(157, 78, 221, 0.3)'}`,
                        borderRadius: 2,
                        p: 1,
                        maxWidth: 400,
                        width: '100%'
                    }
                }}
            >
                <DialogTitle className="cyber-header" sx={{ fontSize: '1rem', color: settings.lightTheme ? '#6200ee' : '#00f2ff' }}>
                    RECOVERY TERMINAL
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} pt={1}>
                        <Typography variant="body2" color="textSecondary">
                            Enter your registered email to reset your access key.
                        </Typography>

                        <TextField
                            label="Registered Email"
                            type="email"
                            value={recoveryEmail}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            disabled={accountFound}
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

                        {accountFound && (
                            <Box display="flex" flexDirection="column" gap={2} mt={1}>
                                <TextField
                                    label="New Password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    edge="end"
                                                    sx={{ color: settings.lightTheme ? '#6200ee' : '#9d4edd' }}
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            </Box>
                        )}

                        {recoveryStatus && (
                            <Alert severity={recoveryStatus.type} sx={{ mt: 1, borderRadius: 2 }}>
                                {recoveryStatus.text}
                            </Alert>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleForgotClose} sx={{ color: settings.lightTheme ? '#6200ee' : '#00f2ff', fontWeight: 'bold' }}>
                        Close
                    </Button>
                    {!accountFound ? (
                        <Button 
                            onClick={handleFindAccount} 
                            variant="outlined" 
                            color="info"
                            sx={{ borderRadius: 2 }}
                        >
                            Find Account
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleSetNewPassword} 
                            variant="contained" 
                            color="info"
                            sx={{ 
                                borderRadius: 2,
                                color: '#ffffff',
                                bgcolor: settings.lightTheme ? '#6200ee' : '#9d4edd',
                                '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                            }}
                        >
                            Set New Password
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* Global Settings sidebar */}
            <SettingsDrawer 
                open={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
                showLogout={false} 
            />
        </Box>
    );
}
