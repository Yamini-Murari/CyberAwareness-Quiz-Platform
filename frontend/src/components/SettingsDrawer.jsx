import React from 'react';
import { 
    Drawer, 
    Box, 
    Typography, 
    IconButton, 
    FormControlLabel, 
    Switch, 
    Divider, 
    Button,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PaletteIcon from '@mui/icons-material/Palette';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSettings } from '../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { playSound } from '../services/audioService';

export default function SettingsDrawer({ open, onClose, showLogout }) {
    const { settings, updateSetting } = useSettings();
    const navigate = useNavigate();

    const handleToggle = (key, value, label) => {
        playSound('click');
        updateSetting(key, value);
        toast.dismiss(); // Dismiss previous toasts to avoid flooding
        toast.success(`${label} preference updated.`);
    };

    const handleLogout = () => {
        playSound('click');
        localStorage.removeItem('currentUser');
        onClose();
        toast.success("Agent logged out. Session secured.");
        navigate('/');
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            transitionDuration={300}
            PaperProps={{
                sx: {
                    width: 320,
                    maxWidth: '100%',
                    bgcolor: settings.lightTheme ? '#ffffff' : '#0a0a0b',
                    color: settings.lightTheme ? '#1a1a1a' : '#ffffff',
                    borderLeft: `1px solid ${settings.lightTheme ? 'rgba(0, 140, 149, 0.2)' : 'rgba(0, 242, 255, 0.15)'}`,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                }
            }}
        >
            <Box>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography 
                        variant="h6" 
                        className="cyber-header"
                        sx={{ fontSize: '1.05rem', fontWeight: 'bold', color: settings.lightTheme ? '#6200ee' : '#9d4edd' }}
                    >
                        Terminal Settings
                    </Typography>
                    <IconButton onClick={onClose} sx={{ color: settings.lightTheme ? 'inherit' : '#00f2ff' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Stack spacing={3.5}>
                    {/* SECTION 1: Accessibility */}
                    <Box>
                        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                            <AccessibilityNewIcon sx={{ fontSize: '1.2rem', color: settings.lightTheme ? '#6200ee' : '#9d4edd' }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', letterSpacing: '0.5px' }}>
                                ACCESSIBILITY
                            </Typography>
                        </Box>
                        <Stack spacing={1} pl={1}>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        size="small"
                                        checked={!!settings.largeText} 
                                        onChange={(e) => handleToggle('largeText', e.target.checked, "Large Text")}
                                        color="info"
                                    />
                                }
                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto' }}>Large Text</Typography>}
                            />
                            <FormControlLabel
                                control={
                                    <Switch 
                                        size="small"
                                        checked={!!settings.friendlyIcons} 
                                        onChange={(e) => handleToggle('friendlyIcons', e.target.checked, "Friendly Icons")}
                                        color="info"
                                    />
                                }
                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto' }}>Friendly Icons</Typography>}
                            />
                            <FormControlLabel
                                control={
                                    <Switch 
                                        size="small"
                                        checked={!!settings.highContrast} 
                                        onChange={(e) => handleToggle('highContrast', e.target.checked, "High Contrast")}
                                        color="info"
                                    />
                                }
                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto' }}>High Contrast</Typography>}
                            />
                        </Stack>
                    </Box>

                    {/* SECTION 2: Appearance */}
                    <Box>
                        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                            <PaletteIcon sx={{ fontSize: '1.2rem', color: settings.lightTheme ? '#6200ee' : '#9d4edd' }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', letterSpacing: '0.5px' }}>
                                APPEARANCE
                            </Typography>
                        </Box>
                        <Stack spacing={1} pl={1}>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        size="small"
                                        checked={!!settings.lightTheme} 
                                        onChange={(e) => handleToggle('lightTheme', e.target.checked, "Light Theme")}
                                        color="info"
                                    />
                                }
                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto' }}>Light Mode</Typography>}
                            />
                        </Stack>
                    </Box>

                    {/* SECTION 3: Audio */}
                    <Box>
                        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                            <VolumeUpIcon sx={{ fontSize: '1.2rem', color: settings.lightTheme ? '#6200ee' : '#9d4edd' }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', letterSpacing: '0.5px' }}>
                                AUDIO
                            </Typography>
                        </Box>
                        <Stack spacing={1} pl={1}>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        size="small"
                                        checked={!!settings.sounds} 
                                        onChange={(e) => handleToggle('sounds', e.target.checked, "Sound Effects")}
                                        color="info"
                                    />
                                }
                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto' }}>Sound Effects</Typography>}
                            />
                        </Stack>
                    </Box>

                    {/* SECTION 4: Account Actions */}
                    {showLogout && (
                        <Box>
                            <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                                <AccountCircleIcon sx={{ fontSize: '1.2rem', color: settings.lightTheme ? '#6200ee' : '#9d4edd' }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', letterSpacing: '0.5px' }}>
                                    ACCOUNT
                                </Typography>
                            </Box>
                            <Box pl={1} pt={0.5}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                    size="small"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                    sx={{
                                        borderRadius: 2,
                                        fontFamily: 'Roboto',
                                        fontWeight: 'bold',
                                        borderWidth: 2,
                                        justifyContent: 'center',
                                        '&:hover': {
                                            borderWidth: 2,
                                            bgcolor: 'rgba(255, 49, 49, 0.08)'
                                        }
                                    }}
                                >
                                    Logout Session
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Box pt={3}>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontStyle: 'italic', fontSize: '0.8rem', fontFamily: 'Roboto' }}>
                    Preferences are saved on this device.
                </Typography>
            </Box>
        </Drawer>
    );
}
