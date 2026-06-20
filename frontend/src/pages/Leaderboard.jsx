import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Avatar, 
    CircularProgress, 
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';

export default function Leaderboard() {
    const { settings } = useSettings();
    const navigate = useNavigate();
    
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
            return;
        }
        setCurrentUser(sessionUser);

        const fetchLeaderboard = async () => {
            try {
                const allUsers = await CyberDB.getAllUsers();
                // Sort by score descending, secondary sort by missionsCompleted descending
                const sorted = (allUsers || []).sort((a, b) => {
                    if ((b.score || 0) !== (a.score || 0)) {
                        return (b.score || 0) - (a.score || 0);
                    }
                    return (b.missionsCompleted || 0) - (a.missionsCompleted || 0);
                });
                setUsers(sorted);
            } catch (err) {
                console.error("Failed to load leaderboard database:", err);
                setError("Unable to synchronize with the global database.");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [navigate]);

    if (loading) {
        return (
            <MainLayout title="SYNCHRONIZING LEADERBOARD">
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="50vh" gap={2}>
                    <CircularProgress color="info" />
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto' }}>
                        Loading global network logs...
                    </Typography>
                </Box>
            </MainLayout>
        );
    }

    const getRankBadge = (rankNum) => {
        if (rankNum === 1) return { char: '🥇', color: '#ffa500' };
        if (rankNum === 2) return { char: '🥈', color: '#e0e0e0' };
        if (rankNum === 3) return { char: '🥉', color: '#cd7f32' };
        return { char: rankNum.toString(), color: settings.lightTheme ? '#6200ee' : '#9d4edd' };
    };

    return (
        <MainLayout title="GLOBAL LEADERBOARD">
            <Box className="animate-in" display="flex" flexDirection="column" gap={4} sx={{ width: '100%' }}>
                
                <Box>
                    <Typography 
                        variant="h5" 
                        className="cyber-header" 
                        sx={{ fontSize: '1.25rem', color: settings.lightTheme ? '#6200ee' : '#9d4edd', mb: 1 }}
                    >
                        AGENTS SCORE REGISTRY
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto' }}>
                        Compare your cybersecurity proficiency rating with other agents across the global simulation matrix.
                    </Typography>
                </Box>

                {error ? (
                    <Alert severity="warning" sx={{ fontFamily: 'Roboto', borderRadius: 2 }}>
                        {error}
                    </Alert>
                ) : (
                    <TableContainer 
                        component={Paper} 
                        elevation={0} 
                        className="glass-panel" 
                        sx={{ 
                            borderRadius: 3, 
                            overflow: 'hidden',
                            border: `1px solid ${settings.lightTheme ? 'rgba(98, 0, 238, 0.15)' : 'rgba(157, 78, 221, 0.15)'}`
                        }}
                    >
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead sx={{ bgcolor: settings.lightTheme ? 'rgba(98,0,238,0.04)' : 'rgba(157,78,221,0.04)' }}>
                                <TableRow>
                                    <TableCell sx={{ color: settings.lightTheme ? '#1a0b36' : 'rgba(255,255,255,0.7)', fontWeight: 'bold', fontFamily: 'Roboto', width: '80px' }}>Rank</TableCell>
                                    <TableCell sx={{ color: settings.lightTheme ? '#1a0b36' : 'rgba(255,255,255,0.7)', fontWeight: 'bold', fontFamily: 'Roboto' }}>Agent Codename</TableCell>
                                    <TableCell sx={{ color: settings.lightTheme ? '#1a0b36' : 'rgba(255,255,255,0.7)', fontWeight: 'bold', fontFamily: 'Roboto' }}>Clearance Rank</TableCell>
                                    <TableCell sx={{ color: settings.lightTheme ? '#1a0b36' : 'rgba(255,255,255,0.7)', fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center' }}>Missions Secured</TableCell>
                                    <TableCell sx={{ color: settings.lightTheme ? '#1a0b36' : 'rgba(255,255,255,0.7)', fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'right' }}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((u, index) => {
                                    const xp = u.score || 0;
                                    const isSelf = currentUser && u.email?.toLowerCase().trim() === currentUser.email?.toLowerCase().trim();
                                    
                                    // Rank Calculation
                                    let rankName = "Beginner";
                                    if (xp >= 3000) rankName = "Pro";
                                    else if (xp >= 1500) rankName = "Expert";
                                    else if (xp >= 500) rankName = "Intermediate";

                                    const badge = getRankBadge(index + 1);

                                    return (
                                        <TableRow 
                                            key={u.email || index} 
                                            sx={{ 
                                                bgcolor: isSelf 
                                                    ? (settings.lightTheme ? 'rgba(98, 0, 238, 0.08)' : 'rgba(157, 78, 221, 0.08)')
                                                    : 'transparent',
                                                borderLeft: isSelf 
                                                    ? `4px solid ${settings.lightTheme ? '#6200ee' : '#9d4edd'}` 
                                                    : 'none',
                                                '&:hover': { 
                                                    bgcolor: isSelf 
                                                        ? (settings.lightTheme ? 'rgba(98, 0, 238, 0.12)' : 'rgba(157, 78, 221, 0.12)')
                                                        : 'rgba(255,255,255,0.02)'
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                {typeof badge.char === 'string' && badge.char.includes('🥇') || badge.char.includes('🥈') || badge.char.includes('🥉') ? (
                                                    <span style={{ fontSize: '1.4rem' }}>{badge.char}</span>
                                                ) : (
                                                    <Avatar 
                                                        sx={{ 
                                                            width: 28, 
                                                            height: 28, 
                                                            fontSize: '0.85rem', 
                                                            fontWeight: 'bold',
                                                            bgcolor: settings.lightTheme ? 'rgba(98, 0, 238, 0.08)' : 'rgba(255,255,255,0.05)',
                                                            color: badge.color
                                                        }}
                                                    >
                                                        {badge.char}
                                                    </Avatar>
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: isSelf ? 'bold' : 'normal', fontFamily: 'Roboto' }}>
                                                {(u.username || u.email || 'Agent').toUpperCase()} {isSelf && " (YOU)"}
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: 'Roboto', fontWeight: '500', color: settings.lightTheme ? '#008c95' : '#00f2ff' }}>
                                                {rankName.toUpperCase()}
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: 'Roboto', textAlign: 'center' }}>
                                                {u.missionsCompleted || 0} / 9
                                            </TableCell>
                                            <TableCell sx={{ fontFamily: 'Roboto', fontWeight: 'bold', color: settings.lightTheme ? '#6200ee' : '#9d4edd', textAlign: 'right' }}>
                                                {xp.toLocaleString()} XP
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

            </Box>
        </MainLayout>
    );
}
