import React, { useState, useEffect } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    TextField, 
    IconButton,
    Container
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import SettingsDrawer from '../components/SettingsDrawer';
import { toast } from 'react-toastify';

export default function MainLayout({ children, title }) {
    const { settings } = useSettings();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!user) {
            navigate('/');
        }
    }, [location.pathname, navigate]);

    const isDashboard = location.pathname === '/dashboard';

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar 
                position="static" 
                sx={{ 
                    bgcolor: settings.lightTheme ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${settings.lightTheme ? 'rgba(0, 140, 149, 0.2)' : 'rgba(0, 242, 255, 0.15)'}`,
                    boxShadow: 'none'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', px: '0 !important' }}>
                        <Box display="flex" alignItems="center" gap={1}>
                            {!isDashboard && (
                                <IconButton 
                                    onClick={() => navigate('/dashboard')} 
                                    sx={{ color: settings.lightTheme ? '#1a1a1a' : '#00f2ff' }}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            )}
                            <Typography 
                                variant="h6" 
                                className="cyber-header" 
                                sx={{ 
                                    fontSize: { xs: '0.9rem', sm: '1.2rem' }, 
                                    fontWeight: 'bold',
                                    color: settings.lightTheme ? '#008c95' : '#00f2ff'
                                }}
                            >
                                {title || 'CYBERQUEST'}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                            <Button 
                                component={Link} 
                                to="/dashboard" 
                                variant={location.pathname === '/dashboard' ? 'contained' : 'outlined'} 
                                color="info" 
                                size="small"
                                sx={{ 
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: location.pathname === '/dashboard' ? '#ffffff' : (settings.lightTheme ? '#6200ee' : '#00f2ff'),
                                    bgcolor: location.pathname === '/dashboard' ? (settings.lightTheme ? '#6200ee' : '#9d4edd') : 'transparent'
                                }}
                            >
                                Dashboard
                            </Button>
                            <Button 
                                component={Link} 
                                to="/missions" 
                                variant={location.pathname === '/missions' || location.pathname.startsWith('/game/') ? 'contained' : 'outlined'} 
                                color="info" 
                                size="small"
                                sx={{ 
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: (location.pathname === '/missions' || location.pathname.startsWith('/game/')) ? '#ffffff' : (settings.lightTheme ? '#6200ee' : '#00f2ff'),
                                    bgcolor: (location.pathname === '/missions' || location.pathname.startsWith('/game/')) ? (settings.lightTheme ? '#6200ee' : '#9d4edd') : 'transparent'
                                }}
                            >
                                Missions
                            </Button>
                            <Button 
                                component={Link} 
                                to="/analyzer" 
                                variant={location.pathname === '/analyzer' ? 'contained' : 'outlined'} 
                                color="info" 
                                size="small"
                                sx={{ 
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: location.pathname === '/analyzer' ? '#ffffff' : (settings.lightTheme ? '#6200ee' : '#00f2ff'),
                                    bgcolor: location.pathname === '/analyzer' ? (settings.lightTheme ? '#6200ee' : '#9d4edd') : 'transparent'
                                }}
                            >
                                Message Analyzer
                            </Button>
                            <Button 
                                component={Link} 
                                to="/progress" 
                                variant={location.pathname === '/progress' ? 'contained' : 'outlined'} 
                                color="info" 
                                size="small"
                                sx={{ 
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: location.pathname === '/progress' ? '#ffffff' : (settings.lightTheme ? '#6200ee' : '#00f2ff'),
                                    bgcolor: location.pathname === '/progress' ? (settings.lightTheme ? '#6200ee' : '#9d4edd') : 'transparent'
                                }}
                            >
                                Progress
                            </Button>
                            <Button 
                                component={Link} 
                                to="/leaderboard" 
                                variant={location.pathname === '/leaderboard' ? 'contained' : 'outlined'} 
                                color="info" 
                                size="small"
                                sx={{ 
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: location.pathname === '/leaderboard' ? '#ffffff' : (settings.lightTheme ? '#6200ee' : '#00f2ff'),
                                    bgcolor: location.pathname === '/leaderboard' ? (settings.lightTheme ? '#6200ee' : '#9d4edd') : 'transparent'
                                }}
                            >
                                Leaderboard
                            </Button>
                            <Button 
                                component={Link} 
                                to="/profile"
                                variant={location.pathname === '/profile' ? 'contained' : 'outlined'} 
                                color="info" 
                                size="small" 
                                startIcon={<AccountCircleIcon />}
                                sx={{ 
                                    color: location.pathname === '/profile' ? '#ffffff' : (settings.lightTheme ? '#6200ee' : '#00f2ff'),
                                    bgcolor: location.pathname === '/profile' ? (settings.lightTheme ? '#6200ee' : '#9d4edd') : 'transparent'
                                }}
                            >
                                Profile
                            </Button>
                            <IconButton 
                                onClick={() => setSettingsOpen(true)} 
                                sx={{ color: settings.lightTheme ? '#6200ee' : '#00f2ff' }}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4, display: 'flex', flexDirection: 'column' }}>
                {children}
            </Container>

            {/* Settings Drawer */}
            <SettingsDrawer 
                open={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
                showLogout={true} 
            />
        </Box>
    );
}
