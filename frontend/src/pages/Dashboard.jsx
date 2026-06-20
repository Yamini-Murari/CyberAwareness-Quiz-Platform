import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Avatar,
    LinearProgress,
    CircularProgress,
    Divider,
    IconButton,
    Chip,
    Stack
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import { useTypewriter } from '../hooks/useTypewriter';
import { playSound } from '../services/audioService';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayIcon from '@mui/icons-material/Replay';
import NavigationIcon from '@mui/icons-material/Navigation';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
const missionDifficulties = {
    PHISHING: 'Easy',
    UPI: 'Medium',
    SOCIAL: 'Medium',
    PRIVACY: 'Easy',
    INTERN: 'Medium',
    MALWARE: 'Hard',
    WIFI: 'Easy',
    IDENTITY: 'Hard',
    AI_SECURITY: 'Hard',
    FOOTPRINTS: 'Medium'
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

export default function Dashboard() {
    const { settings } = useSettings();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
        } else {
            // Load fresh data
            CyberDB.getUser(sessionUser.email).then(freshUser => {
                setUser(freshUser || sessionUser);
                setLoading(false);
            });
        }
    }, [navigate]);

    const xp = user ? (user.score || 0) : 0;
    const completedList = user ? (user.completedMissionsList || []) : [];
    const completedCount = completedList.length;
    const level = Math.floor(xp / 1000) + 1;

    // Rank logic
    let rank = "Beginner";
    let rankIdx = 0;
    if (xp >= 3000) {
        rank = "Pro";
        rankIdx = 3;
    } else if (xp >= 1500) {
        rank = "Expert";
        rankIdx = 2;
    } else if (xp >= 500) {
        rank = "Intermediate";
        rankIdx = 1;
    } else {
        rank = "Beginner";
        rankIdx = 0;
    }

    const milestones = [500, 1500, 3000, 5000];
    const targetXp = milestones[rankIdx];
    const prevXp = rankIdx > 0 ? milestones[rankIdx - 1] : 0;
    const progressToNext = Math.min(((xp - prevXp) / (targetXp - prevXp)) * 100, 100);

    // AI neural link messages
    let neuralMsg = "";
    if (!user) {
        neuralMsg = "";
    } else if (xp === 0) {
        neuralMsg = "Agent, your systems are offline. Access 'Missions' to initialize your training protocols.";
    } else if (xp > 3000) {
        neuralMsg = "Pro detected. Your cognitive firewalls are operating at 100%. All systems optimized.";
    } else {
        neuralMsg = `Analyzing stats... ${xp} XP synchronized. Training data suggests you're ready for more complex missions.`;
    }

    const typewrittenText = useTypewriter(neuralMsg, 25);

    if (loading || !user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress color="info" />
            </Box>
        );
    }

    // Dynamic Active Mission search
    const partialProgress = user.partialProgress || {};

    let activeType = missionTypes.find(type => {
        const val = partialProgress[type] || 0;
        return val > 0 && val < 10;
    });

    if (!activeType) {
        activeType = missionTypes.find(type => !completedList.includes(type));
    }

    if (!activeType) {
        activeType = "PHISHING"; // fallback if all completed
    }

    const activeProgress = partialProgress[activeType] || 0;
    const activePct = (activeProgress / 10) * 100;
    const isActiveCompleted = completedList.includes(activeType) || activeProgress >= 10;

    // Total learning progress percentage (across 10 modules)
    const totalCount = missionTypes.reduce((acc, type) => acc + Math.min(partialProgress[type] || 0, 10), 0);
    const totalProgressPct = Math.round((totalCount / 100) * 100);

    const usernameDisplay = (user.username || user.email || 'Agent').toUpperCase();

    // Recent activity compilation
    const recentActivities = [];
    completedList.slice(-2).forEach(type => {
        recentActivities.push({
            text: `Secured Module: ${missionNames[type]}`,
            detail: `Earned +1,000 XP Reward`,
            icon: missionIcons[type],
            status: 'SECURED'
        });
    });

    const analyzedCount = partialProgress["ANALYZED_COUNT"] || 0;
    if (analyzedCount > 0) {
        recentActivities.push({
            text: `Threat Scans Processed`,
            detail: `Scanned ${analyzedCount} suspicious message payloads`,
            icon: '🔍',
            status: 'ACTIVE'
        });
    }

    recentActivities.push({
        text: "Neural Link Stabilized",
        detail: `Interface synchronized with ${xp} XP credentials`,
        icon: '⚡',
        status: 'ONLINE'
    });

    // 4 futuristic navigation cards
    const navigationCards = [
        {
            title: "TRAINING MISSIONS",
            desc: "Access interactive sandbox modules and phishing quizzes.",
            path: "/missions",
            icon: "🎯",
            cta: "LAUNCH MISSION HUB",
            color: "var(--accent-color)"
        },
        {
            title: "MESSAGE ANALYZER",
            desc: "Scan suspicious text messages and emails for fraud alerts.",
            path: "/analyzer",
            icon: "🔍",
            cta: "INITIALIZE SCANS",
            color: "var(--accent-secondary)"
        },
        {
            title: "PROGRESS LOGS",
            desc: "Inspect achievement lists, milestones, and progress charts.",
            path: "/progress",
            icon: "📊",
            cta: "VIEW METRICS",
            color: "var(--success-color)"
        },
        {
            title: "GLOBAL STANDINGS",
            desc: "View rankings and see where you place among elite agents.",
            path: "/leaderboard",
            icon: "🏆",
            cta: "OPEN LEADERBOARD",
            color: "var(--warning-color)"
        }
    ];

    return (
        <MainLayout title="CYBER COMMAND OVERVIEW">
            <Box className="animate-in" display="flex" flexDirection="column" gap={3} sx={{ pb: 4 }}>
                
                {/* ROW 1: Agent command status (Left) & XP Progress (Right) */}
                <Grid container spacing={3}>
                    {/* Agent Status Card */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            className="glass-panel" 
                            elevation={0}
                            sx={{ 
                                p: 3, 
                                borderRadius: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: '1px solid var(--card-border)'
                            }}
                        >
                            <Box>
                                <Typography 
                                    variant="caption" 
                                    className="cyber-header" 
                                    sx={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', mb: 1, display: 'inline-block' }}
                                >
                                    LOGGED IN • AGENT COMMAND STATUS
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
                                    <Typography variant="h4" sx={{ fontWeight: '800', fontFamily: 'Orbitron', wordBreak: 'break-word' }}>
                                        {usernameDisplay}
                                    </Typography>
                                    <Box display="flex" gap={1} alignItems="center">
                                        <Chip 
                                            label={rank.toUpperCase()} 
                                            size="small" 
                                            sx={{ 
                                                fontFamily: 'Orbitron', 
                                                fontWeight: 'bold', 
                                                bgcolor: 'rgba(157, 78, 221, 0.1)', 
                                                color: 'var(--accent-color)',
                                                border: '1px solid var(--card-border)'
                                            }} 
                                        />
                                        <Avatar 
                                            sx={{ 
                                                width: 32, 
                                                height: 32, 
                                                bgcolor: 'var(--accent-secondary)', 
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                fontFamily: 'Orbitron',
                                                fontSize: '0.9rem',
                                                boxShadow: '0 0 10px rgba(0, 242, 255, 0.4)'
                                            }}
                                        >
                                            {level}
                                        </Avatar>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 2 }}>
                                    Welcome back, Agent. Your threat intelligence profile has been successfully cached. Continue training scenarios to fortify cognitive firewalls.
                                </Typography>
                            </Box>

                            {/* Typewriter message */}
                            <Box 
                                display="flex" 
                                alignItems="center" 
                                gap={1.5}
                                sx={{ 
                                    p: 1.2, 
                                    borderRadius: 2, 
                                    bgcolor: 'rgba(0, 242, 255, 0.02)',
                                    borderLeft: `3px solid var(--accent-secondary)`
                                }}
                            >
                                <CircularProgress size={12} thickness={6} sx={{ color: 'var(--accent-secondary)' }} />
                                <Typography variant="caption" sx={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: '0.75rem' }}>
                                    {typewrittenText}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* XP Progress Card */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            className="glass-panel" 
                            elevation={0}
                            sx={{ 
                                p: 3, 
                                borderRadius: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: '1px solid var(--card-border)'
                            }}
                        >
                            <Box>
                                <Typography 
                                    variant="caption" 
                                    className="cyber-header" 
                                    sx={{ fontSize: '0.8rem', color: 'var(--accent-color)', mb: 1, display: 'inline-block' }}
                                >
                                    COGNITIVE FIREWALL SYNCHRONIZATION
                                </Typography>
                                <Grid container spacing={2} sx={{ mt: 0.5, mb: 1.5 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block' }}>TOTAL XP</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-secondary)' }}>
                                            {xp.toLocaleString()} XP
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block' }}>MODULES</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--success-color)' }}>
                                            {completedCount} / 10
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '0.7rem' }}>
                                        CLEARANCE PROGRESS ({xp.toLocaleString()} / {targetXp.toLocaleString()} XP)
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'var(--accent-secondary)', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                        {Math.round(progressToNext)}%
                                    </Typography>
                                </Box>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={progressToNext} 
                                    sx={{ 
                                        height: 6, 
                                        borderRadius: 3,
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        '& .MuiLinearProgress-bar': {
                                            background: 'linear-gradient(90deg, var(--accent-color) 0%, var(--accent-secondary) 100%)'
                                        }
                                    }}
                                />
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* ROW 2: Current active mission (Left) & Recent Activities logs (Right) */}
                <Grid container spacing={3}>
                    {/* Active Mission Objective */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            className="glass-panel" 
                            elevation={0} 
                            sx={{ 
                                p: 3, 
                                borderRadius: 3, 
                                height: '100%', 
                                border: '1px solid var(--card-border)', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between' 
                            }}
                        >
                            <Box>
                                <Typography 
                                    variant="caption" 
                                    className="cyber-header" 
                                    sx={{ fontSize: '0.8rem', color: 'var(--warning-color)', mb: 1, display: 'inline-block' }}
                                >
                                    ACTIVE INTEL OBJECTIVE
                                </Typography>
                                
                                <Box display="flex" gap={2} alignItems="center" mb={2} mt={1}>
                                    <Typography variant="h3">{missionIcons[activeType] || '🎯'}</Typography>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                                            {missionNames[activeType]}
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontFamily: 'Orbitron', color: 'var(--warning-color)', fontWeight: 'bold' }}>
                                            DIFFICULTY: {missionDifficulties[activeType]?.toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box mb={2}>
                                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>Progress</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{activeProgress} / 10</Typography>
                                    </Box>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={activePct} 
                                        sx={{ 
                                            height: 4, 
                                            borderRadius: 2,
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            '& .MuiLinearProgress-bar': { bgcolor: 'var(--accent-color)' }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Button
                                component={Link}
                                to={`/game/${activeType}`}
                                variant="contained"
                                fullWidth
                                size="small"
                                startIcon={<PlayArrowIcon />}
                                sx={{ 
                                    fontFamily: 'Orbitron', 
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    py: 1,
                                    color: '#000000',
                                    bgcolor: 'var(--accent-secondary)',
                                    '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                                }}
                            >
                                RESUME OBJECTIVE
                            </Button>
                        </Card>
                    </Grid>

                    {/* Recent Event Logs */}
                    <Grid item xs={12} md={6}>
                        <Card 
                            className="glass-panel" 
                            elevation={0} 
                            sx={{ 
                                p: 3, 
                                borderRadius: 3, 
                                height: '100%', 
                                border: '1px solid var(--card-border)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box>
                                <Typography 
                                    variant="caption" 
                                    className="cyber-header" 
                                    sx={{ fontSize: '0.8rem', color: 'var(--success-color)', mb: 1.5, display: 'inline-block' }}
                                >
                                    NEURAL EVENT LOGS
                                </Typography>
                                
                                <Stack spacing={1.2} sx={{ mt: 1 }}>
                                    {recentActivities.map((act, idx) => (
                                        <Box key={idx} display="flex" alignItems="center" gap={1.5} sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.01)' }}>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                                                {act.icon}
                                            </Avatar>
                                            <Box flexGrow={1}>
                                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', lineHeight: 1.2 }}>
                                                    {act.text}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', fontSize: '0.6rem' }}>
                                                    {act.detail}
                                                </Typography>
                                            </Box>
                                            <Chip 
                                                label={act.status} 
                                                size="small" 
                                                sx={{ 
                                                    fontSize: '0.55rem', 
                                                    height: 14, 
                                                    fontWeight: 'bold', 
                                                    bgcolor: 'rgba(255,255,255,0.03)', 
                                                    color: act.status === 'SECURED' ? 'var(--success-color)' : (act.status === 'ACTIVE' ? 'var(--accent-secondary)' : 'var(--text-muted)') 
                                                }} 
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* ROW 3: Large Futuristic Navigation Cards (4-column grid) */}
                <Box sx={{ mt: 1 }}>
                    <Typography 
                        variant="caption" 
                        className="cyber-header" 
                        sx={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', mb: 2, display: 'inline-block' }}
                    >
                        📡 INTERFACE NAVIGATION HUB
                    </Typography>

                    <Grid container spacing={3}>
                        {navigationCards.map((card, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <Card
                                    className="glass-panel"
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 3.5,
                                        border: `1px solid var(--card-border)`,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            borderColor: card.color,
                                            transform: 'translateY(-6px)',
                                            boxShadow: `0 0 20px ${card.color}40`
                                        }
                                    }}
                                >
                                    <Box>
                                        <Avatar 
                                            sx={{ 
                                                width: 44, 
                                                height: 44, 
                                                mb: 2, 
                                                bgcolor: `${card.color}15`, 
                                                color: card.color,
                                                border: `1.5px solid ${card.color}`,
                                                fontSize: '1.3rem',
                                                boxShadow: `0 0 10px ${card.color}30`
                                            }}
                                        >
                                            {card.icon}
                                        </Avatar>
                                        
                                        <Typography 
                                            variant="subtitle2" 
                                            className="cyber-header"
                                            sx={{ fontWeight: 'bold', color: 'var(--text-color)', mb: 1, fontSize: '0.85rem', letterSpacing: '1px' }}
                                        >
                                            {card.title}
                                        </Typography>
                                        
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', mb: 3, lineHeight: 1.3, fontSize: '0.72rem' }}>
                                            {card.desc}
                                        </Typography>
                                    </Box>

                                    <Button
                                        component={Link}
                                        to={card.path}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        sx={{
                                            fontFamily: 'Orbitron',
                                            fontSize: '0.68rem',
                                            fontWeight: 'bold',
                                            borderRadius: 2,
                                            py: 0.8,
                                            borderColor: card.color,
                                            color: card.color,
                                            '&:hover': {
                                                bgcolor: `${card.color}10`,
                                                borderColor: card.color
                                            }
                                        }}
                                    >
                                        {card.cta}
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>
        </MainLayout>
    );
}
