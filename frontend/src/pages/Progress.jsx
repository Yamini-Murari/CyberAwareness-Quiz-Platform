import React, { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
    LinearProgress,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    Avatar,
    Stack,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import { playSound } from '../services/audioService';

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

const milestones = [
    { name: "RECRUIT INITIALIZATION", xp: 0, desc: "Neural link synchronized. Access protocol established." },
    { name: "CYBER ROOKIE", xp: 500, desc: "Spotter of phishing emails and suspicious messaging." },
    { name: "SECURE GUARD", xp: 1500, desc: "Defended UPI scams and public WiFi networks." },
    { name: "ELITE AGENT", xp: 3000, desc: "Acquired advanced malware recognition and social engineering filters." },
    { name: "CYBERMASTER LEGEND", xp: 5000, desc: "Achieved total threat intelligence mastery. Systems 100% fortified." }
];

// Custom SVG Line/Area Chart representing XP progress across categories
function XPChart({ partialProgress, settings }) {
    const categories = ["PHISHING", "UPI", "SOCIAL", "PRIVACY", "INTERN", "MALWARE", "WIFI", "IDENTITY", "AI_SECURITY", "FOOTPRINTS"];
    const chartData = categories.map(cat => ({
        name: cat,
        value: (partialProgress[cat] || 0) * 100 // Convert questions solved to XP (100 XP per question)
    }));

    // SVG parameters
    const width = 600;
    const height = 180;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2.5;

    const maxVal = 1000;
    const points = chartData.map((d, i) => {
        const x = padding + (i / (chartData.length - 1)) * chartWidth;
        const y = padding + chartHeight - (d.value / maxVal) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${padding},${padding + chartHeight} ${points} ${padding + chartWidth},${padding + chartHeight}`;

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', py: 1 }}>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={settings.lightTheme ? '#6200ee' : '#9d4edd'} stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={settings.lightTheme ? '#6200ee' : '#9d4edd'} />
                        <stop offset="100%" stopColor="#00f2ff" />
                    </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1={padding} y1={padding} x2={padding + chartWidth} y2={padding} stroke="rgba(255,255,255,0.06)" strokeDasharray="3" />
                <line x1={padding} y1={padding + chartHeight / 2} x2={padding + chartWidth} y2={padding + chartHeight / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3" />
                <line x1={padding} y1={padding + chartHeight} x2={padding + chartWidth} y2={padding + chartHeight} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                {/* Vertical Guidelines */}
                {chartData.map((d, i) => {
                    const x = padding + (i / (chartData.length - 1)) * chartWidth;
                    return (
                        <line key={i} x1={x} y1={padding} x2={x} y2={padding + chartHeight} stroke="rgba(255,255,255,0.04)" />
                    );
                })}

                {/* Area Fill */}
                <polygon points={areaPoints} fill="url(#areaGrad)" />
                {/* Line Path */}
                <polyline points={points} fill="none" stroke="url(#lineGrad)" strokeWidth="3" />

                {/* Data Points and Labels */}
                {chartData.map((d, i) => {
                    const x = padding + (i / (chartData.length - 1)) * chartWidth;
                    const y = padding + chartHeight - (d.value / maxVal) * chartHeight;
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="5" fill="#00f2ff" stroke={settings.lightTheme ? '#ffffff' : '#08051a'} strokeWidth="2.5" />
                            <text x={x} y={padding + chartHeight + 15} fontSize="9" fill={settings.lightTheme ? '#5e527a' : 'rgba(255,255,255,0.65)'} textAnchor="middle" fontFamily="Roboto" fontWeight="500">
                                {d.name.substring(0, 4)}
                            </text>
                            <text x={x} y={y - 8} fontSize="9" fill={settings.lightTheme ? '#6200ee' : '#ffa500'} textAnchor="middle" fontFamily="Roboto" fontWeight="bold">
                                {d.value}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </Box>
    );
}

// Vertical Stepper Timeline component
function AchievementTimeline({ currentXp, settings }) {
    return (
        <Box sx={{ position: 'relative', pl: 3, py: 1 }}>
            {/* Vertical Line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    bottom: 8,
                    left: 9,
                    width: 2,
                    bgcolor: settings.lightTheme ? 'rgba(98, 0, 238, 0.15)' : 'rgba(255,255,255,0.08)'
                }}
            />

            {milestones.map((m, idx) => {
                const isUnlocked = currentXp >= m.xp;
                const accentColor = settings.lightTheme ? '#6200ee' : '#9d4edd';

                return (
                    <Box key={idx} sx={{ display: 'flex', gap: 3, mb: 3.5, position: 'relative' }}>
                        {/* Timeline Node */}
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: `2px solid ${isUnlocked ? '#00f2ff' : (settings.lightTheme ? '#d1c4e9' : 'rgba(255,255,255,0.1)')}`,
                                bgcolor: isUnlocked ? accentColor : (settings.lightTheme ? '#ffffff' : '#110a29'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,
                                boxShadow: isUnlocked ? `0 0 10px ${accentColor}` : 'none',
                                transition: 'all 0.3s ease',
                                left: -30,
                                position: 'absolute',
                                mt: 0.5
                            }}
                        >
                            {isUnlocked && (
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ffffff' }} />
                            )}
                        </Box>

                        {/* Content */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: isUnlocked ? (settings.lightTheme ? '#6200ee' : (settings.highContrast ? '#ffffff' : '#e0e0e0')) : (settings.lightTheme ? '#8d82aa' : 'rgba(255,255,255,0.4)'),
                                        fontFamily: 'Roboto',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {m.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: isUnlocked ? '#00f2ff' : 'text.secondary',
                                        bgcolor: isUnlocked ? (settings.lightTheme ? 'rgba(0,140,149,0.1)' : 'rgba(0,242,255,0.1)') : 'transparent',
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: 1
                                    }}
                                >
                                    {m.xp} XP
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                    fontSize: '0.85rem',
                                    mt: 0.5,
                                    fontFamily: 'Roboto'
                                }}
                            >
                                {m.desc}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}

function DifficultyBreakdown({ partialProgress, settings }) {
    const easyCompleted = ["PHISHING", "PRIVACY", "WIFI"].reduce((acc, c) => acc + Math.min(partialProgress[c] || 0, 10), 0);
    const easyPct = Math.round((easyCompleted / 30) * 100);

    const mediumCompleted = ["UPI", "SOCIAL", "INTERN", "FOOTPRINTS"].reduce((acc, c) => acc + Math.min(partialProgress[c] || 0, 10), 0);
    const mediumPct = Math.round((mediumCompleted / 40) * 100);

    const hardCompleted = ["MALWARE", "IDENTITY", "AI_SECURITY"].reduce((acc, c) => acc + Math.min(partialProgress[c] || 0, 10), 0);
    const hardPct = Math.round((hardCompleted / 30) * 100);

    const rings = [
        { label: "EASY", pct: easyPct, color: 'var(--success-color)' },
        { label: "MEDIUM", pct: mediumPct, color: 'var(--accent-secondary)' },
        { label: "HARD", pct: hardPct, color: 'var(--danger-color)' }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', py: 2, flexWrap: 'nowrap', gap: 2 }}>
            {rings.map((ring, idx) => (
                <Box key={idx} display="flex" flexDirection="column" alignItems="center" gap={1.5}>
                    <Box position="relative" display="inline-flex">
                        <CircularProgress
                            variant="determinate"
                            value={100}
                            size={70}
                            thickness={4}
                            sx={{ color: 'rgba(255,255,255,0.05)' }}
                        />
                        <CircularProgress
                            variant="determinate"
                            value={ring.pct}
                            size={70}
                            thickness={4}
                            sx={{
                                color: ring.color,
                                position: 'absolute',
                                left: 0,
                                '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
                            }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="caption" component="div" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold' }}>
                                {ring.pct}%
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="caption" sx={{ fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {ring.label}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default function Progress() {
    const { settings } = useSettings();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certOpen, setCertOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
        } else {
            CyberDB.getUser(sessionUser.email)
                .then(freshUser => {
                    if (freshUser) {
                        setUser(freshUser);
                    } else {
                        setUser(sessionUser);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load user progress:", err);
                    setUser(sessionUser); // fallback
                    setLoading(false);
                });
        }
    }, [navigate]);

    const xp = user ? (user.score || 0) : 0;

    // Rank calculations
    let rank = "Novice";
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

    const rankMilestones = [500, 1500, 3000, 5000];
    const targetXp = rankMilestones[rankIdx];
    const prevXp = rankIdx > 0 ? rankMilestones[rankIdx - 1] : 0;
    const progressToNext = Math.min(((xp - prevXp) / (targetXp - prevXp)) * 100, 100);
    const requiredXp = Math.max(targetXp - xp, 0);


    if (loading || !user) {
        return (
            <MainLayout title="LOADING DATA">
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="50vh" gap={2}>
                    <CircularProgress color="info" />
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto' }}>
                        Synchronizing security profiles...
                    </Typography>
                </Box>
            </MainLayout>
        );
    }

    const completedList = user.completedMissionsList || [];
    const completedListLength = completedList.length;
    const riskPct = Math.max(100 - (completedListLength * 12), 10);

    let riskLabel = "RISK PROFILE: STABLE";
    let riskColor = "success";
    if (riskPct > 70) {
        riskLabel = "RISK PROFILE: CRITICAL";
        riskColor = "error";
    } else if (riskPct > 30) {
        riskLabel = "RISK PROFILE: VULNERABLE";
        riskColor = "warning";
    } else {
        riskLabel = "RISK PROFILE: SECURE";
        riskColor = "success";
    }

    // Filter completed badges
    const partialProgress = user.partialProgress || {};
    const earnedBadges = missionTypes.filter(type => (partialProgress[type] || 0) >= 10);
    const level = Math.floor(xp / 1000) + 1;

    // Learning completion % calculation
    const totalCount = missionTypes.reduce((acc, type) => acc + Math.min(partialProgress[type] || 0, 10), 0);
    const totalProgressPct = Math.round((totalCount / 100) * 100);

    const handlePrintCertificate = () => {
        playSound('click');
        window.print();
    };

    const usernameDisplay = (user.username || user.email || 'Agent').toUpperCase();

    // Activity Log compilation
    const activityLogs = [];
    completedList.forEach(type => {
        activityLogs.push({
            event: `Completed Module: ${missionNames[type] || type}`,
            desc: `Mastery status verified • System locked in`,
            icon: missionIcons[type] || '🏆',
            date: '+1,000 XP'
        });
    });
    const analyzedCount = partialProgress["ANALYZED_COUNT"] || 0;
    if (analyzedCount > 0) {
        activityLogs.push({
            event: "Scam Detection Scans",
            desc: `Inspected and analyzed ${analyzedCount} suspicious message records`,
            icon: '🔍',
            date: `+${analyzedCount * 50} XP`
        });
    }

    return (
        <MainLayout title="AGENT PERFORMANCE LOGS">
            <Box className="animate-in" display="flex" flexDirection="column" gap={3} sx={{ pb: 6 }}>

                {/* ROW 1: KPI Metrics (4-column grid) */}
                <Grid container spacing={3}>
                    {/* XP Earned */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>
                                        XP SCORE EARNED
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-secondary)' }}>
                                        {xp.toLocaleString()} ⚡
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(0, 242, 255, 0.1)', color: 'var(--accent-secondary)', width: 40, height: 40 }}>
                                    ⚡
                                </Avatar>
                            </Box>
                        </Card>
                    </Grid>
                    {/* Level */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>
                                        CLEARANCE LEVEL
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--success-color)' }}>
                                        LEVEL {level} 📈
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(0, 255, 135, 0.1)', color: 'var(--success-color)', width: 40, height: 40 }}>
                                    📈
                                </Avatar>
                            </Box>
                        </Card>
                    </Grid>
                    {/* Completion % */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>
                                        SYLLABUS COMPLETE
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-color)' }}>
                                        {totalProgressPct}% 🎯
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(157, 78, 221, 0.1)', color: 'var(--accent-color)', width: 40, height: 40 }}>
                                    🎯
                                </Avatar>
                            </Box>
                        </Card>
                    </Grid>
                    {/* Badges */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>
                                        BADGES EARNED
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--warning-color)' }}>
                                        {earnedBadges.length} MEDALS 🏅
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255, 159, 28, 0.1)', color: 'var(--warning-color)', width: 40, height: 40 }}>
                                    🏅
                                </Avatar>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Progress Clearance Gauge (Next Rank progress) */}
                <Card className="glass-panel" elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'var(--text-muted)', fontFamily: 'Orbitron' }}>
                            RANK SYSTEM clearance status: {rank.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'var(--accent-secondary)' }}>
                            {Math.round(progressToNext)}% to next milestone ({targetXp} XP)
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
                </Card>

                {/* ROW 2: XP Progress Chart (Full-width) */}
                <Card className="glass-panel" elevation={0} sx={{ borderRadius: 3, p: 3, border: '1px solid var(--card-border)' }}>
                    <Typography
                        variant="caption"
                        className="cyber-header"
                        sx={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', mb: 2, display: 'inline-block' }}
                    >
                        📊 CATEGORY INTEL PROGRESSION CHART
                    </Typography>
                    <XPChart partialProgress={partialProgress} settings={settings} />
                </Card>

                {/* ROW 3: Mission Completion Statistics (Left 60%) & Category Breakdown (Right 40%) */}
                <Grid container spacing={3}>
                    {/* Sandbox Modules Completion Stats */}
                    <Grid item xs={12}>
                        <Card className="glass-panel" elevation={0} sx={{ borderRadius: 3, p: 3, border: '1px solid var(--card-border)', height: '100%' }}>
                            <Typography
                                variant="caption"
                                className="cyber-header"
                                sx={{ fontSize: '0.8rem', color: 'var(--accent-color)', mb: 3, display: 'inline-block' }}
                            >
                                📋 SANDBOX MODULE COMPLETED STATISTICS
                            </Typography>

                            <Grid container spacing={2}>
                                {missionTypes.map((type) => {
                                    const completedCount = partialProgress[type] || 0;
                                    const totalQuestions = 10;
                                    const pct = (completedCount / totalQuestions) * 100;
                                    const icon = missionIcons[type] || '🎯';

                                    return (
                                        <Grid item xs={12} sm={6} key={type}>
                                            <Box sx={{ p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.03)', bgcolor: 'rgba(255,255,255,0.01)' }}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <span>{icon}</span> {missionNames[type] || type}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: 'var(--accent-secondary)' }}>
                                                        {completedCount} / {totalQuestions}
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={pct}
                                                    sx={{
                                                        height: 4,
                                                        borderRadius: 2,
                                                        bgcolor: 'rgba(255,255,255,0.05)',
                                                        '& .MuiLinearProgress-bar': {
                                                            bgcolor: completedCount === 10 ? 'var(--success-color)' : 'var(--accent-color)'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Card>
                    </Grid>

                    {/* Category Breakdown (Rings) */}

                </Grid>

                {/* ROW 4: Recent Achievements / Showcase (Left) & Achievement Timeline (Right) */}
                <Grid container spacing={3}>
                    {/* Unlocked Clearance Showcase */}
                    <Grid item xs={12} md={6}>
                        <Card className="glass-panel" elevation={0} sx={{ borderRadius: 3, p: 3, height: '100%', border: '1px solid var(--card-border)' }}>
                            <Typography
                                variant="caption"
                                className="cyber-header"
                                sx={{ fontSize: '0.8rem', color: 'var(--accent-color)', mb: 3, display: 'inline-block' }}
                            >
                                🎖️ UNLOCKED CLEARANCE BADGES
                            </Typography>

                            <Grid container spacing={2}>
                                {earnedBadges.length > 0 ? (
                                    earnedBadges.map(type => (
                                        <Grid item xs={6} sm={4} key={type} textAlign="center">
                                            <Box
                                                className="stat-box glow-on-hover float-anim"
                                                sx={{
                                                    borderRadius: 3,
                                                    p: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth: 1.5,
                                                    mx: 'auto'
                                                }}
                                            >
                                                <Typography variant="h4" sx={{ mb: 1 }}>🏅</Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Roboto',
                                                        color: 'var(--accent-secondary)',
                                                        wordBreak: 'break-word'
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
                                        <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic', fontFamily: 'Roboto', p: 1 }}>
                                            No clearance badges unlocked yet. Complete modules to 100% to earn medals.
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                {/* Registry Activity Log card */}
                <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)' }}>
                    <Typography variant="caption" className="cyber-header" sx={{ fontSize: '0.8rem', color: 'var(--accent-color)', mb: 2.5, display: 'inline-block' }}>
                        📜 AGENT ACTIVITY EVENT REGISTRY
                    </Typography>
                    <Stack spacing={1.5}>
                        {activityLogs.map((log, idx) => (
                            <Box key={idx} display="flex" alignItems="center" gap={2} sx={{ p: 1.2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.03)', bgcolor: 'rgba(0,0,0,0.1)' }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                                    {log.icon}
                                </Avatar>
                                <Box flexGrow={1}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', fontSize: '0.8rem' }}>
                                        {log.event}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" sx={{ fontFamily: 'Roboto', display: 'block', fontSize: '0.65rem' }}>
                                        {log.desc}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={log.date}
                                    size="small"
                                    sx={{
                                        fontSize: '0.6rem',
                                        fontWeight: 'bold',
                                        bgcolor: log.date.startsWith('+') ? 'rgba(0, 242, 255, 0.08)' : 'rgba(255,255,255,0.03)',
                                        color: log.date.startsWith('+') ? 'var(--accent-secondary)' : 'var(--text-muted)',
                                        border: log.date.startsWith('+') ? '1px solid rgba(0, 242, 255, 0.15)' : 'none'
                                    }}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Card>

                {/* Certificate banner */}
                {rankIdx === 3 && (
                    <Box mt={2} textAlign="center" className="animate-in">
                        <Card
                            className="glass-panel"
                            elevation={0}
                            sx={{
                                p: 3.5,
                                borderRadius: 3,
                                borderColor: 'var(--accent-color) !important'
                            }}
                        >
                            <Typography variant="h5" className="cyber-header" sx={{ mb: 1.5, color: 'var(--accent-color)' }}>
                                🏆 ELITE AGENT CERTIFICATION
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2.5, fontFamily: 'Roboto', color: 'var(--text-muted)' }}>
                                Congratulations, Agent! You have reached the rank of <strong>PRO</strong>. Download your official CyberQuest certification documents.
                            </Typography>
                            <Button
                                variant="contained"
                                color="info"
                                size="large"
                                onClick={() => {
                                    playSound('click');
                                    setCertOpen(true);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    fontFamily: 'Orbitron',
                                    fontWeight: 'bold',
                                    color: '#000000',
                                    bgcolor: 'var(--accent-secondary)',
                                    '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                                }}
                            >
                                Get Certificate
                            </Button>
                        </Card>
                    </Box>
                )}
            </Box>

            {/* Certificate Modal */}
            <Dialog
                open={certOpen}
                onClose={() => setCertOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: '#ffffff',
                        color: '#000000',
                        border: '10px double #9d4edd',
                        borderRadius: 3,
                        p: { xs: 3, md: 5 }
                    }
                }}
            >
                <DialogContent id="cert-print-area">
                    <Box textAlign="center" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#000000', letterSpacing: 2 }}>
                            CYBERQUEST
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', letterSpacing: 1 }}>
                            CERTIFICATE OF ACHIEVEMENT
                        </Typography>

                        <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 5, color: '#666666' }}>
                            This is to certify that
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                mt: 3,
                                fontWeight: 'bold',
                                borderBottom: '2px solid #000000',
                                display: 'inline-block',
                                px: { xs: 3, sm: 6 },
                                py: 1
                            }}
                        >
                            {usernameDisplay}
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 4, color: '#666666', maxHeight: 60 }}>
                            has successfully completed all advanced training modules and attained the rank of
                        </Typography>

                        <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#6200ee' }}>
                            CYBER SECURITY PRO
                        </Typography>

                        <Grid container sx={{ mt: 8 }} justifyContent="space-around">
                            <Box textAlign="center">
                                <Typography variant="body2" sx={{ mb: 0 }}>____________________</Typography>
                                <Typography variant="caption" sx={{ color: '#666666' }}>CyberQuest Academy</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="body2" sx={{ mb: 0 }}>
                                    {new Date().toLocaleDateString()}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666666' }}>Date of Completion</Typography>
                            </Box>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3, className: 'd-print-none' }}>
                    <Button
                        onClick={() => setCertOpen(false)}
                        sx={{ color: '#6200ee', fontFamily: 'Roboto', fontWeight: 'bold' }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handlePrintCertificate}
                        sx={{
                            borderRadius: 2,
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            bgcolor: '#6200ee',
                            color: '#ffffff',
                            '&:hover': { bgcolor: '#000000' }
                        }}
                    >
                        Print Certificate
                    </Button>
                </DialogActions>
            </Dialog>
        </MainLayout>
    );
}
