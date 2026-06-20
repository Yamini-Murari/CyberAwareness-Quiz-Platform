import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    LinearProgress, 
    Button, 
    Grid,
    Alert,
    CircularProgress 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { allScenarios } from '../utils/scenarios';
import { CyberDB } from '../services/cyberDb';
import { playSound } from '../services/audioService';
import confetti from 'canvas-confetti';

export default function GameArena() {
    const { settings } = useSettings();
    const { type } = useParams();
    const navigate = useNavigate();

    const [filteredScenarios, setFilteredScenarios] = useState([]);
    const [idx, setIdx] = useState(0);
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    
    // AI Analyzer state
    const [analyzerProgress, setAnalyzerProgress] = useState(0);
    const [analyzerText, setAnalyzerText] = useState('Scanning communication for synthetic patterns...');

    useEffect(() => {
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
            return;
        }

        CyberDB.getUser(sessionUser.email).then(freshUser => {
            setUser(freshUser || sessionUser);
        });

        // Filter and sort scenarios
        const matched = allScenarios.filter(s => s.type === type);
        if (!matched.length) {
            navigate('/missions');
            return;
        }

        const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
        matched.sort((a, b) => (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0));
        
        setFilteredScenarios(matched);
        setIdx(0);
        setSelectedOption(null);
        setShowFeedback(false);
    }, [type, navigate]);

    // Handle AI Analyzer animation for AI_SECURITY mission type
    useEffect(() => {
        if (type === 'AI_SECURITY' && filteredScenarios.length > 0 && !showFeedback) {
            setAnalyzerProgress(0);
            setAnalyzerText('Scanning communication for synthetic patterns...');
            
            const timer1 = setTimeout(() => {
                setAnalyzerProgress(100);
            }, 500);

            const timer2 = setTimeout(() => {
                setAnalyzerText('AI DETECTED: Unnatural frequency patterns and high linguistic consistency found.');
            }, 2500);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [idx, type, filteredScenarios, showFeedback]);

    if (!user || filteredScenarios.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress color="info" />
            </Box>
        );
    }

    const currentScenario = filteredScenarios[idx];
    const progressPct = ((idx + 1) / filteredScenarios.length) * 100;

    const handleOptionSelect = async (opt) => {
        if (showFeedback) return; // Prevent double clicking
        playSound('click');
        setSelectedOption(opt);
        setShowFeedback(true);

        if (opt.isCorrect) {
            playSound('correct');
            // Update score in local DB: increase score by 100 XP
            const updatedUser = await CyberDB.updateProgress(user.email, null, 100, false);
            setUser(updatedUser);
        } else {
            playSound('error');
        }
    };

    const handleNextScenario = async () => {
        playSound('click');
        try {
            // Save partial progress
            const updatedUser = await CyberDB.getUser(user.email);
            if (updatedUser) {
                updatedUser.partialProgress = updatedUser.partialProgress || {};
                updatedUser.partialProgress[type] = Math.max(updatedUser.partialProgress[type] || 0, idx + 1);
                await CyberDB.saveUser(updatedUser);
                setUser(updatedUser);
            }
        } catch (e) {}

        const nextIdx = idx + 1;
        if (nextIdx < filteredScenarios.length) {
            setIdx(nextIdx);
            setSelectedOption(null);
            setShowFeedback(false);
        } else {
            // Complete mission entirely
            try {
                const finalUser = await CyberDB.updateProgress(user.email, type, 0, true);
                setUser(finalUser);
                
                // Trigger success confetti celebration
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            } catch (e) {}
            
            navigate('/progress');
        }
    };

    const correctOption = currentScenario.options.find(o => o.isCorrect);

    return (
        <MainLayout title={`${type} ARENA`}>
            <Box display="flex" justifyContent="center" flexGrow={1} className="animate-in">
                <Box sx={{ width: '100%', maxWidth: 800 }}>
                    <Card 
                        className="glass-panel"
                        elevation={0}
                        sx={{ 
                            borderRadius: 3,
                            borderColor: `${settings.lightTheme ? 'rgba(98, 0, 238, 0.3)' : 'rgba(157, 78, 221, 0.3)'} !important`,
                            p: { xs: 2, md: 4 }
                        }}
                    >
                        {/* Progress Header */}
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="caption" sx={{ color: settings.lightTheme ? '#6200ee' : '#9d4edd', fontWeight: 'bold' }}>
                                MISSION ANALYSIS
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Level: {currentScenario.difficulty} | Mission: {idx + 1} / {filteredScenarios.length}
                            </Typography>
                        </Box>

                        {/* Progress Bar */}
                        <LinearProgress 
                            variant="determinate" 
                            value={progressPct} 
                            color="info"
                            sx={{ 
                                height: 4, 
                                bgcolor: 'rgba(255,255,255,0.05)', 
                                mb: 4,
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: settings.lightTheme ? '#6200ee' : '#9d4edd'
                                }
                            }}
                        />

                        {/* Scenario Question Info */}
                        <Box textAlign="center" mb={4}>
                            <Typography 
                                component="span" 
                                sx={{ fontSize: '4.5rem', display: 'block', mb: 1, filter: settings.lightTheme ? 'none' : 'drop-shadow(0 0 10px rgba(157, 78, 221, 0.3))' }}
                            >
                                {currentScenario.icon}
                            </Typography>
                            <Typography 
                                variant="h5" 
                                className="cyber-header"
                                sx={{ 
                                    fontSize: '1.25rem', 
                                    fontWeight: 'bold', 
                                    color: settings.lightTheme ? '#6200ee' : '#ffffff',
                                    mb: 3
                                }}
                            >
                                {currentScenario.title}
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    borderLeft: `5px solid ${settings.lightTheme ? '#6200ee' : '#9d4edd'}`, 
                                    pl: 3, 
                                    textAlign: 'left',
                                    fontSize: '1.15rem',
                                    fontWeight: 'bold',
                                    lineHeight: 1.6,
                                    color: settings.lightTheme ? '#004085' : '#ffcc00'
                                }}
                            >
                                {currentScenario.desc}
                            </Typography>
                        </Box>

                        {/* Options Buttons */}
                        {!showFeedback ? (
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {currentScenario.options.map((opt, oIdx) => (
                                    <Grid item xs={12} key={oIdx}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => handleOptionSelect(opt)}
                                            sx={{
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                p: 2.5,
                                                borderRadius: 3,
                                                borderColor: settings.lightTheme ? 'rgba(0,0,0,0.15)' : '#333',
                                                color: settings.lightTheme ? '#1a1a1a' : '#ffffff',
                                                textTransform: 'none',
                                                borderWidth: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: settings.lightTheme ? '#6200ee' : '#9d4edd',
                                                    bgcolor: settings.lightTheme ? 'rgba(0, 140, 149, 0.05)' : 'rgba(0, 242, 255, 0.05)',
                                                    borderWidth: 1,
                                                    '& .opt-text': {
                                                        color: settings.lightTheme ? '#6200ee' : '#9d4edd'
                                                    }
                                                }
                                            }}
                                        >
                                            <Typography 
                                                variant="body2" 
                                                className="opt-text" 
                                                sx={{ 
                                                    fontWeight: 500, 
                                                    fontSize: '0.95rem',
                                                    color: settings.lightTheme ? '#6200ee' : '#9d4edd' 
                                                }}
                                            >
                                                {opt.text}
                                            </Typography>
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            /* Feedback Panel Overlay */
                            <Box 
                                className="animate-in"
                                sx={{ 
                                    borderTop: `2px solid ${settings.lightTheme ? 'rgba(98, 0, 238, 0.2)' : 'rgba(255,255,255,0.05)'}`, 
                                    bgcolor: 'rgba(255, 255, 255, 0.02)',
                                    p: 3,
                                    borderRadius: 2
                                }}
                            >
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        fontWeight: 'bold', 
                                        mb: 3, 
                                        color: selectedOption.isCorrect 
                                            ? (settings.lightTheme ? '#28a745' : '#39ff14') 
                                            : (settings.lightTheme ? '#dc3545' : '#ff3131')
                                    }}
                                >
                                    {selectedOption.isCorrect ? '✓ MISSION SECURED' : '⚠ SECURITY BREACH'}
                                </Typography>

                                {!selectedOption.isCorrect && correctOption && (
                                    <Box 
                                        sx={{ 
                                            border: `2px solid ${settings.lightTheme ? '#28a745' : '#39ff14'}`, 
                                            p: 2, 
                                            mb: 3,
                                            bgcolor: 'rgba(0, 255, 0, 0.03)'
                                        }}
                                    >
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: settings.lightTheme ? '#28a745' : '#39ff14', 
                                                display: 'block' 
                                            }}
                                        >
                                            ✓ RECOMMENDED ACTION:
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                                            {correctOption.text}
                                        </Typography>
                                    </Box>
                                )}

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" sx={{ color: settings.lightTheme ? '#6200ee' : '#9d4edd', fontWeight: 'bold', letterSpacing: 0.5, display: 'block' }}>
                                        FEEDBACK:
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5, color: settings.lightTheme ? '#e67e22' : '#ffa500', fontWeight: 'bold' }}>
                                        {selectedOption.reason}
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="caption" sx={{ color: settings.lightTheme ? '#6200ee' : '#9d4edd', fontWeight: 'bold', letterSpacing: 0.5, display: 'block' }}>
                                        LEARNING OUTCOME:
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            mt: 0.5, 
                                            color: settings.lightTheme ? '#28a745' : '#39ff14', 
                                            fontWeight: 'bold' 
                                        }}
                                    >
                                        {selectedOption.lesson}
                                    </Typography>
                                </Box>

                                <Button 
                                    variant="contained" 
                                    color="info" 
                                    fullWidth 
                                    onClick={handleNextScenario}
                                    sx={{ 
                                        py: 1.5, 
                                        borderRadius: 3, 
                                        fontFamily: 'Roboto', 
                                        fontWeight: 'bold',
                                        color: settings.lightTheme ? '#ffffff' : '#000000',
                                        bgcolor: settings.lightTheme ? '#6200ee' : '#9d4edd',
                                        '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                                    }}
                                >
                                    ACKNOWLEDGE & CONTINUE
                                </Button>
                            </Box>
                        )}

                        {/* AI Artifact Analyzer Tool (Active on AI_SECURITY category only) */}
                        {type === 'AI_SECURITY' && !showFeedback && (
                            <Box 
                                className="terminal-box" 
                                sx={{ 
                                    mt: 4, 
                                    borderStyle: 'dashed !important',
                                    borderColor: settings.lightTheme ? '#6200ee !important' : '#9d4edd !important' 
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <Typography variant="body2">🔍</Typography>
                                    <Typography 
                                        variant="caption" 
                                        className="cyber-header" 
                                        sx={{ fontSize: '0.75rem', color: settings.lightTheme ? '#6200ee' : '#9d4edd' }}
                                    >
                                        AI ARTIFACT ANALYZER ACTIVE
                                    </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', color: 'text.secondary' }}>
                                    {analyzerText}
                                </Typography>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={analyzerProgress} 
                                    color="info"
                                    sx={{ 
                                        height: 2, 
                                        bgcolor: 'rgba(255,255,255,0.05)', 
                                        mt: 2,
                                        '& .MuiLinearProgress-bar': {
                                            transition: analyzerProgress === 100 ? 'width 2s linear' : 'none',
                                            bgcolor: settings.lightTheme ? '#6200ee' : '#9d4edd'
                                        }
                                    }}
                                />
                            </Box>
                        )}

                    </Card>
                </Box>
            </Box>
        </MainLayout>
    );
}
