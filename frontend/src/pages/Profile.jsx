import React, { useState, useEffect } from 'react';
import { 
    Grid, 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    TextField, 
    Divider, 
    Avatar,
    FormControlLabel,
    Switch,
    Stack,
    CircularProgress,
    Chip,
    LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import { playSound } from '../services/audioService';
import { toast } from 'react-toastify';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaletteIcon from '@mui/icons-material/Palette';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';

const missionTypes = ["PHISHING", "UPI", "SOCIAL", "PRIVACY", "INTERN", "MALWARE", "WIFI", "IDENTITY", "AI_SECURITY", "FOOTPRINTS"];
const missionNames = {
    PHISHING: 'Phishing',
    UPI: 'UPI Scams',
    SOCIAL: 'Social Fraud',
    PRIVACY: 'Privacy Protection',
    INTERN: 'Fake Internships',
    MALWARE: 'Malware Defense',
    WIFI: 'Public WiFi Security',
    IDENTITY: 'ID Theft Defense',
    AI_SECURITY: 'AI Security',
    FOOTPRINTS: 'Digital Footprints'
};
const missionIcons = {
    PHISHING: '📧',
    UPI: '💸',
    SOCIAL: '👥',
    PRIVACY: '🛡️',
    INTERN: '💼',
    MALWARE: '🦠',
    WIFI: '🌐',
    IDENTITY: '🆔',
    AI_SECURITY: '🤖',
    FOOTPRINTS: '👣'
};

export default function Profile() {
    const { settings, updateSetting } = useSettings();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
        } else {
            CyberDB.getUser(sessionUser.email).then(freshUser => {
                setUser(freshUser || sessionUser);
                setEditUsername((freshUser || sessionUser).username || '');
                setLoading(false);
            });
        }
    }, [navigate]);

    const handleToggle = (key, value, label) => {
        playSound('click');
        updateSetting(key, value);
        toast.dismiss();
        toast.success(`${label} preference updated.`);
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        if (!user) return;
        playSound('click');

        try {
            const freshUser = await CyberDB.getUser(user.email);
            if (!freshUser) return;

            const trimmedUsername = editUsername.trim();
            if (!trimmedUsername) {
                toast.warning('Codename cannot be empty.');
                return;
            }

            freshUser.username = trimmedUsername;
            if (editPassword) {
                if (editPassword.length < 4) {
                    toast.warning('Password must be at least 4 characters.');
                    return;
                }
                freshUser.password = editPassword;
            }

            await CyberDB.saveUser(freshUser);
            setUser(freshUser);
            setEditPassword('');
            toast.success('Agent profile updated successfully.');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update agent profile.');
        }
    };

    const handleLogout = () => {
        playSound('click');
        localStorage.removeItem('currentUser');
        toast.success("Agent logged out. Session secured.");
        navigate('/');
    };

    if (loading || !user) {
        return (
            <MainLayout title="LOADING PROFILE">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress color="info" />
                </Box>
            </MainLayout>
        );
    }

    const xp = user.score || 0;
    const level = Math.floor(xp / 1000) + 1;
    let rank = "Beginner";
    if (xp >= 3000) rank = "Pro";
    else if (xp >= 1500) rank = "Expert";
    else if (xp >= 500) rank = "Intermediate";

    const completedList = user.completedMissionsList || [];
    const partialProgress = user.partialProgress || {};
    const earnedBadges = missionTypes.filter(type => (partialProgress[type] || 0) >= 10);
    const analyzedCount = partialProgress["ANALYZED_COUNT"] || 0;

    const usernameDisplay = (user.username || user.email || 'Agent').toUpperCase();

    // Compile dynamic activity logs
    const activityLogs = [];
    completedList.forEach(type => {
        activityLogs.push({
            event: `Completed Module: ${missionNames[type] || type}`,
            desc: `Mastery verified • Node secured`,
            icon: missionIcons[type] || '🏆',
            date: '+1,000 XP'
        });
    });
    if (analyzedCount > 0) {
        activityLogs.push({
            event: "Message Analyzer Scans",
            desc: `Processed ${analyzedCount} suspicious email/SMS checks`,
            icon: '🔍',
            date: `+${analyzedCount * 50} XP`
        });
    }

    return (
        <MainLayout title="AGENTS INTERFACE PROFILE">
            <Box className="animate-in" display="flex" flexDirection="column" gap={3} sx={{ width: '100%', pb: 6 }}>
                
                {/* TOP ROW: Profile Overview & Preferences / Stats */}
                <Grid container spacing={3}>
                    
                    {/* Left Column (xs=12, md=4) - Avatar Metadata Card & Forms */}
                    <Grid item xs={12} md={4} display="flex" flexDirection="column" gap={3}>
                        
                        {/* Profile Info Summary Card */}
                        <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)', textAlign: 'center' }}>
                            <Avatar 
                                sx={{ 
                                    width: 90, 
                                    height: 90, 
                                    mx: 'auto', 
                                    mb: 2, 
                                    bgcolor: 'var(--accent-color)', 
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontFamily: 'Orbitron',
                                    fontSize: '2.5rem',
                                    boxShadow: '0 0 20px var(--accent-glow)',
                                    border: '2px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                {usernameDisplay.substring(0, 2)}
                            </Avatar>
                            
                            <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: '#ffffff', mb: 0.5 }}>
                                {usernameDisplay}
                            </Typography>
                            
                            <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto', mb: 2.5 }}>
                                {user.email}
                            </Typography>
                            
                            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.06)' }} />

                            <Grid container spacing={2}>
                                <Grid item xs={4} sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>
                                        LEVEL
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-secondary)' }}>
                                        {level}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>
                                        RANK
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-color)', fontSize: '0.85rem' }}>
                                        {rank.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>
                                        XP SCORE
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: '#00ff88' }}>
                                        {xp}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Edit Access Credentials Forms Card */}
                        <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <LockIcon sx={{ color: 'var(--accent-secondary)', fontSize: '1.2rem' }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: '#ffffff' }}>
                                    ACCESS CREDENTIALS
                                </Typography>
                            </Box>
                            
                            <form onSubmit={handleProfileSave}>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', color: 'var(--text-muted)', mb: 0.5, display: 'block' }}>
                                            Agent Codename
                                        </Typography>
                                        <TextField 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            value={editUsername}
                                            onChange={(e) => setEditUsername(e.target.value)}
                                            placeholder="Enter your system username..."
                                            InputProps={{
                                                sx: { 
                                                    bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(0,0,0,0.2)',
                                                    borderRadius: 2,
                                                    fontSize: '0.85rem'
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', color: 'var(--text-muted)', mb: 0.5, display: 'block' }}>
                                            Modify Password (Optional)
                                        </Typography>
                                        <TextField 
                                            fullWidth
                                            size="small"
                                            type="password"
                                            variant="outlined"
                                            value={editPassword}
                                            onChange={(e) => setEditPassword(e.target.value)}
                                            placeholder="New account password..."
                                            InputProps={{
                                                sx: { 
                                                    bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(0,0,0,0.2)',
                                                    borderRadius: 2,
                                                    fontSize: '0.85rem'
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        color="info"
                                        fullWidth
                                        sx={{ 
                                            mt: 1,
                                            py: 1, 
                                            borderRadius: 2, 
                                            fontFamily: 'Orbitron',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                            color: settings.lightTheme ? '#ffffff' : '#000000',
                                            bgcolor: settings.lightTheme ? '#6200ee' : '#00f2ff',
                                            '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                                        }}
                                    >
                                        UPDATE AGENT CREDENTIALS
                                    </Button>
                                </Stack>
                            </form>
                        </Card>
                    </Grid>

                    {/* Right Column (xs=12, md=8) - Analytics Summary & Preferences Toggles */}
                    <Grid item xs={12} md={8} display="flex" flexDirection="column" gap={3}>
                        
                        {/* Analytics summary Panel Card */}
                        <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="caption" className="cyber-header" sx={{ fontSize: '0.8rem', color: 'var(--accent-color)', mb: 2.5, display: 'inline-block' }}>
                                    ⚡ ANALYTICS & OPERATIONAL OVERVIEW
                                </Typography>

                                <Grid container spacing={2} mb={3}>
                                    {/* Missions completed */}
                                    <Grid item xs={12} sm={4}>
                                        <Box className="stat-box" sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(0,0,0,0.15)', height: '100%' }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>
                                                    MISSIONS
                                                </Typography>
                                                <AssignmentIcon sx={{ color: 'var(--accent-secondary)', fontSize: '1.2rem' }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold' }}>
                                                {completedList.length} <Typography variant="caption" color="textSecondary">/ 10</Typography>
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
                                                Completed sandboxes
                                            </Typography>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={(completedList.length / 10) * 100} 
                                                sx={{ mt: 1.5, height: 4, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: 'var(--accent-secondary)' } }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Badges unlocked */}
                                    <Grid item xs={12} sm={4}>
                                        <Box className="stat-box" sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(0,0,0,0.15)', height: '100%' }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>
                                                    MEDALS
                                                </Typography>
                                                <EmojiEventsIcon sx={{ color: 'var(--accent-color)', fontSize: '1.2rem' }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                                                {earnedBadges.length} <Typography variant="caption" color="textSecondary">Unlocked</Typography>
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
                                                100% mastery badges
                                            </Typography>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={(earnedBadges.length / 10) * 100} 
                                                sx={{ mt: 1.5, height: 4, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: 'var(--accent-color)' } }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Analyzer scans */}
                                    <Grid item xs={12} sm={4}>
                                        <Box className="stat-box" sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.04)', bgcolor: 'rgba(0,0,0,0.15)', height: '100%' }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>
                                                    SCANS
                                                </Typography>
                                                <SearchIcon sx={{ color: '#00ff88', fontSize: '1.2rem' }} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', color: '#00ff88' }}>
                                                {analyzedCount} <Typography variant="caption" color="textSecondary">Audits</Typography>
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
                                                Message analyzer checks
                                            </Typography>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={Math.min((analyzedCount / 20) * 100, 100)} 
                                                sx={{ mt: 1.5, height: 4, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#00ff88' } }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />

                            {/* Preferences Grid Section */}
                            <Box>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <PaletteIcon sx={{ fontSize: '1.2rem', color: 'var(--accent-secondary)' }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: '#ffffff' }}>
                                        AGENT INTERFACE PREFERENCES
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    {/* Column 1: Core Toggles */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', mb: 1 }}>
                                            THEME & INTERFACE
                                        </Typography>
                                        <Stack spacing={1} pl={0.5}>
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        size="small"
                                                        checked={!!settings.lightTheme} 
                                                        onChange={(e) => handleToggle('lightTheme', e.target.checked, "Light Theme")}
                                                        color="info"
                                                    />
                                                }
                                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto', fontSize: '0.8rem' }}>Light Theme Override</Typography>}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        size="small"
                                                        checked={!!settings.sound} 
                                                        onChange={(e) => handleToggle('sound', e.target.checked, "Sound Effects")}
                                                        color="info"
                                                    />
                                                }
                                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    Audio Feedback <VolumeUpIcon sx={{ fontSize: '0.9rem', opacity: 0.7 }} />
                                                </Typography>}
                                            />
                                        </Stack>
                                    </Grid>

                                    {/* Column 2: Accessibility */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', mb: 1 }}>
                                            ACCESSIBILITY & HELPMATES
                                        </Typography>
                                        <Stack spacing={1} pl={0.5}>
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        size="small"
                                                        checked={!!settings.largeText} 
                                                        onChange={(e) => handleToggle('largeText', e.target.checked, "Large Text")}
                                                        color="info"
                                                    />
                                                }
                                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto', fontSize: '0.8rem' }}>Large Font Scaling</Typography>}
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
                                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto', fontSize: '0.8rem' }}>High Contrast Palette</Typography>}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        size="small"
                                                        checked={!!settings.friendlyIcons} 
                                                        onChange={(e) => handleToggle('friendlyIcons', e.target.checked, "Friendly Helpers")}
                                                        color="info"
                                                    />
                                                }
                                                label={<Typography variant="body2" sx={{ fontFamily: 'Roboto', fontSize: '0.8rem' }}>Visual Helper Icons (🛡️)</Typography>}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>

                                <Box display="flex" justifyContent="flex-end" mt={3}>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        startIcon={<LogoutIcon />}
                                        onClick={handleLogout}
                                        sx={{ 
                                            borderRadius: 2, 
                                            fontFamily: 'Orbitron', 
                                            fontWeight: 'bold', 
                                            fontSize: '0.75rem',
                                            borderColor: 'var(--danger-color)',
                                            color: 'var(--danger-color)',
                                            '&:hover': {
                                                bgcolor: 'rgba(255,42,122,0.05)',
                                                borderColor: 'var(--danger-color)'
                                            }
                                        }}
                                    >
                                        DISCONNECT ACTIVE SESSION
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* BOTTOM ROW: Showcase & Recent Logs */}
                <Grid container spacing={3}>
                    
                    {/* Unlocked Badges Showcase Column (xs=12, md=6) */}
                    <Grid item xs={12} md={6}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)', height: '100%' }}>
                            <Typography variant="caption" className="cyber-header" sx={{ fontSize: '0.8rem', color: 'var(--accent-color)', mb: 2.5, display: 'inline-block' }}>
                                🎖️ UNLOCKED CLEARANCE BADGES
                            </Typography>
                            
                            <Grid container spacing={2}>
                                {earnedBadges.length > 0 ? (
                                    earnedBadges.map(type => (
                                        <Grid item xs={6} sm={4} key={type} textAlign="center">
                                            <Box
                                                className="stat-box glow-on-hover float-anim"
                                                sx={{
                                                    borderRadius: 2,
                                                    p: 1.5,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth: 1.5,
                                                    mx: 'auto'
                                                }}
                                            >
                                                <Typography variant="h5" sx={{ mb: 0.5 }}>🏅</Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Roboto',
                                                        color: 'var(--accent-secondary)',
                                                        wordBreak: 'break-word',
                                                        lineHeight: 1.1
                                                    }}
                                                >
                                                    {missionNames[type] || type}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.6rem', mt: 0.5, fontFamily: 'Roboto' }}>
                                                    SECURED
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.06)' }}>
                                            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', fontFamily: 'Roboto' }}>
                                                No clearance badges unlocked yet. Complete modules to 100% to earn medals.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Card>
                    </Grid>

                    {/* Recent Operational Logs Column (xs=12, md=6) */}
                    <Grid item xs={12} md={6}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)', height: '100%' }}>
                            <Typography variant="caption" className="cyber-header" sx={{ fontSize: '0.8rem', color: 'var(--warning-color)', mb: 2.5, display: 'inline-block' }}>
                                📜 RECENT OPERATIONAL LOGS
                            </Typography>
                            
                            <Stack spacing={1.5} sx={{ maxHeight: 280, overflowY: 'auto', pr: 0.5 }}>
                                {activityLogs.length > 0 ? (
                                    activityLogs.map((log, idx) => (
                                        <Box key={idx} display="flex" alignItems="center" gap={2} sx={{ p: 1.2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.03)', bgcolor: 'rgba(0,0,0,0.1)' }}>
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                                                {log.icon}
                                            </Avatar>
                                            <Box flexGrow={1}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', fontSize: '0.8rem', color: '#ffffff' }}>
                                                    {log.event}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontFamily: 'Roboto', display: 'block', fontSize: '0.65rem' }}>
                                                    {log.desc}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={log.date}
                                                size="small"
                                                color="info"
                                                sx={{
                                                    fontSize: '0.6rem',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Orbitron',
                                                    height: 20,
                                                    bgcolor: 'rgba(0, 242, 255, 0.1)',
                                                    color: 'var(--accent-secondary)'
                                                }}
                                            />
                                        </Box>
                                    ))
                                ) : (
                                    <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.06)' }}>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', fontFamily: 'Roboto' }}>
                                            System idle. No operational activity logs synchronized.
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>

            </Box>
        </MainLayout>
    );
}
