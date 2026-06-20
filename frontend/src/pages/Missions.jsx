import React, { useState, useEffect } from 'react';
import { 
    Grid, 
    Typography, 
    Card, 
    CardContent, 
    Box, 
    LinearProgress,
    Button,
    Chip,
    CircularProgress,
    TextField,
    InputAdornment,
    Tabs,
    Tab
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { playSound } from '../services/audioService';
import { CyberDB } from '../services/cyberDb';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';

const missions = [
    { type: 'PHISHING', name: 'Phishing Detection', icon: '📧', difficulty: 'Easy', xpReward: 1000, delay: '0.05s' },
    { type: 'UPI', name: 'UPI Payment Scams', icon: '💸', difficulty: 'Medium', xpReward: 1000, delay: '0.1s' },
    { type: 'SOCIAL', name: 'Social Engineering', icon: '👥', difficulty: 'Medium', xpReward: 1000, delay: '0.15s' },
    { type: 'PRIVACY', name: 'Privacy Protection', icon: '🛡️', difficulty: 'Easy', xpReward: 1000, delay: '0.2s' },
    { type: 'INTERN', name: 'Fake Internships', icon: '💼', difficulty: 'Medium', xpReward: 1000, delay: '0.25s' },
    { type: 'MALWARE', name: 'Malware Hazards', icon: '🦠', difficulty: 'Hard', xpReward: 1000, delay: '0.3s' },
    { type: 'WIFI', name: 'Public WiFi Safety', icon: '🌐', difficulty: 'Easy', xpReward: 1000, delay: '0.35s' },
    { type: 'IDENTITY', name: 'ID Theft Prevention', icon: '🆔', difficulty: 'Hard', xpReward: 1000, delay: '0.4s' },
    { type: 'AI_SECURITY', name: 'AI Security & Fakes', icon: '🤖', difficulty: 'Hard', xpReward: 1000, delay: '0.45s' },
    { type: 'FOOTPRINTS', name: 'Digital Footprints', icon: '👣', difficulty: 'Medium', xpReward: 1000, delay: '0.5s' }
];

export default function Missions() {
    const { settings } = useSettings();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Filters state
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        setLoading(true);
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
        } else {
            CyberDB.getUser(sessionUser.email)
                .then(freshUser => {
                    setUser(freshUser || sessionUser);
                    setLoading(false);
                })
                .catch(() => {
                    setUser(sessionUser);
                    setLoading(false);
                });
        }
    }, [navigate]);

    const handleStartMission = (type) => {
        playSound('click');
        navigate(`/game/${type}`);
    };

    const handleDifficultyChange = (event, newValue) => {
        playSound('click');
        setSelectedDifficulty(newValue);
    };

    const handleCategoryClick = (categoryType) => {
        playSound('click');
        setSelectedCategory(prev => prev === categoryType ? 'ALL' : categoryType);
    };

    if (loading || !user) {
        return (
            <MainLayout title="LOADING MISSIONS">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress color="info" />
                </Box>
            </MainLayout>
        );
    }

    // Filter logic
    const filteredMissions = missions.filter(mission => {
        const matchesSearch = mission.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDiff = selectedDifficulty === 'ALL' || mission.difficulty.toUpperCase() === selectedDifficulty.toUpperCase();
        const matchesCat = selectedCategory === 'ALL' || mission.type === selectedCategory;
        return matchesSearch && matchesDiff && matchesCat;
    });

    return (
        <MainLayout title="ACTIVE SANDBOX MISSIONS">
            <Box className="animate-in" display="flex" flexDirection="column" gap={4} sx={{ width: '100%', pb: 6 }}>
                
                {/* Search and Filters Hub */}
                <Card 
                    className="glass-panel" 
                    elevation={0}
                    sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)' }}
                >
                    <Grid container spacing={3} alignItems="center">
                        {/* Search Input */}
                        <Grid item xs={12} md={4}>
                            <TextField 
                                placeholder="Search modules..."
                                fullWidth
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'var(--text-muted)' }} />
                                        </InputAdornment>
                                    ),
                                    sx: { 
                                        bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(255,255,255,0.02)',
                                        borderRadius: 2
                                    }
                                }}
                            />
                        </Grid>

                        {/* Difficulty tabs */}
                        <Grid item xs={12} md={8} display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                            <Tabs 
                                value={selectedDifficulty} 
                                onChange={handleDifficultyChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                sx={{
                                    '& .MuiTabs-indicator': { bgcolor: 'var(--accent-secondary)' }
                                }}
                            >
                                <Tab label="ALL MISSIONS" value="ALL" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '0.8rem' }} />
                                <Tab label="EASY" value="EASY" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--success-color)' }} />
                                <Tab label="MEDIUM" value="MEDIUM" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--warning-color)' }} />
                                <Tab label="HARD" value="HARD" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--danger-color)' }} />
                            </Tabs>
                        </Grid>

                        {/* Category Chip filters */}
                        <Grid item xs={12}>
                            <Box display="flex" gap={1} flexWrap="wrap">
                                {missions.map((m) => {
                                    const isSelected = selectedCategory === m.type;
                                    return (
                                        <Chip 
                                            key={m.type}
                                            label={m.name}
                                            onClick={() => handleCategoryClick(m.type)}
                                            variant={isSelected ? "filled" : "outlined"}
                                            sx={{
                                                fontFamily: 'Roboto',
                                                fontWeight: 'bold',
                                                fontSize: '0.75rem',
                                                bgcolor: isSelected ? 'var(--accent-color)' : 'transparent',
                                                color: isSelected ? '#ffffff' : 'var(--text-color)',
                                                borderColor: isSelected ? 'transparent' : 'var(--card-border)',
                                                '&:hover': {
                                                    bgcolor: isSelected ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)'
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                {/* Missions Grid */}
                {filteredMissions.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredMissions.map((mission) => {
                            const progressVal = user?.partialProgress?.[mission.type] || 0;
                            const isCompleted = user?.completedMissionsList?.includes(mission.type) || progressVal >= 10;
                            const pct = Math.min((progressVal / 10) * 100, 100);

                            let diffColor = "var(--success-color)";
                            if (mission.difficulty === "Medium") diffColor = "var(--warning-color)";
                            else if (mission.difficulty === "Hard") diffColor = "var(--danger-color)";

                            return (
                                <Grid item xs={12} sm={6} md={4} key={mission.type}>
                                    <Card
                                        className="glass-panel"
                                        elevation={0}
                                        sx={{
                                            border: `1px solid var(--card-border)`,
                                            borderRadius: 3.5,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            p: 3,
                                            transition: 'transform 0.2s, border-color 0.2s',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                borderColor: 'var(--accent-color)'
                                            }
                                        }}
                                    >
                                        {/* Completed Badge */}
                                        {isCompleted && (
                                            <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 0.5 }}>
                                                <CheckCircleIcon sx={{ color: 'var(--success-color)', fontSize: '1.2rem' }} />
                                                <StarIcon sx={{ color: '#ffa500', fontSize: '1.2rem' }} />
                                            </Box>
                                        )}

                                        <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* Large Floating Icon */}
                                            <Box 
                                                className="float-anim"
                                                sx={{ 
                                                    fontSize: '3.2rem', 
                                                    mb: 2,
                                                    display: 'block'
                                                }}
                                            >
                                                {mission.icon}
                                            </Box>

                                            {/* Title */}
                                            <Typography 
                                                variant="h6" 
                                                className="cyber-header"
                                                sx={{ 
                                                    fontSize: '0.95rem', 
                                                    fontWeight: 'bold',
                                                    color: 'var(--text-color)',
                                                    mb: 1.5,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {mission.name}
                                            </Typography>

                                            {/* Meta Chips */}
                                            <Box display="flex" gap={1} mb={3}>
                                                <Chip 
                                                    label={mission.difficulty.toUpperCase()} 
                                                    size="small" 
                                                    sx={{ 
                                                        bgcolor: 'transparent', 
                                                        color: diffColor, 
                                                        border: `1.5px solid ${diffColor}`,
                                                        fontSize: '0.65rem', 
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Orbitron',
                                                        height: 20
                                                    }}
                                                />
                                                <Chip 
                                                    label={`+${mission.xpReward} XP`} 
                                                    size="small" 
                                                    sx={{ 
                                                        bgcolor: 'rgba(0, 242, 255, 0.08)',
                                                        color: 'var(--accent-secondary)',
                                                        border: '1px solid rgba(0, 242, 255, 0.2)',
                                                        fontSize: '0.65rem', 
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Orbitron',
                                                        height: 20
                                                    }}
                                                />
                                            </Box>

                                            {/* Progress bar */}
                                            <Box sx={{ width: '100%', mb: 3 }}>
                                                <Box display="flex" justifyContent="space-between" mb={0.5}>
                                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>
                                                        {isCompleted ? 'Module Secured' : (progressVal > 0 ? 'In Progress' : 'Not Attempted')}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                                        {progressVal}/10 Solved
                                                    </Typography>
                                                </Box>
                                                <LinearProgress 
                                                    variant="determinate" 
                                                    value={pct} 
                                                    sx={{ 
                                                        height: 5, 
                                                        borderRadius: 2.5,
                                                        bgcolor: 'rgba(255,255,255,0.05)',
                                                        '& .MuiLinearProgress-bar': {
                                                            bgcolor: isCompleted ? 'var(--success-color)' : 'var(--accent-color)'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </CardContent>

                                        <Button
                                            variant={isCompleted ? "outlined" : "contained"}
                                            fullWidth
                                            startIcon={isCompleted ? <ReplayIcon /> : <PlayArrowIcon />}
                                            onClick={() => handleStartMission(mission.type)}
                                            sx={{
                                                borderRadius: 2,
                                                fontFamily: 'Orbitron',
                                                fontWeight: 'bold',
                                                fontSize: '0.75rem',
                                                py: 1.2,
                                                borderColor: isCompleted ? 'var(--accent-color)' : 'transparent',
                                                color: isCompleted ? 'var(--accent-color)' : '#000000',
                                                bgcolor: isCompleted ? 'transparent' : 'var(--accent-secondary)',
                                                '&:hover': {
                                                    bgcolor: isCompleted ? 'rgba(157,78,221,0.05)' : '#ffffff',
                                                    color: '#000000',
                                                    borderColor: isCompleted ? 'var(--accent-color)' : 'transparent'
                                                }
                                            }}
                                        >
                                            {isCompleted ? 'REVIEW MODULE' : (progressVal > 0 ? 'RESUME MISSION' : 'START MISSION')}
                                        </Button>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : (
                    <Card className="glass-panel" elevation={0} sx={{ p: 6, borderRadius: 3, border: '1px solid var(--card-border)', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Orbitron', mb: 1, color: 'var(--text-muted)' }}>
                            NO MODULES FOUND
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto' }}>
                            Adjust search terms or reset filters to display training sandbox missions.
                        </Typography>
                    </Card>
                )}

            </Box>
        </MainLayout>
    );
}
