import React, { useState, useEffect } from 'react';
import { 
    Grid, 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    Divider, 
    LinearProgress, 
    Avatar, 
    Chip,
    FormControlLabel,
    Checkbox,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useSettings } from '../hooks/useSettings';
import { CyberDB } from '../services/cyberDb';
import { api } from '../services/api';
import { playSound } from '../services/audioService';
import { toast } from 'react-toastify';

export default function MessageAnalyzer() {
    const { settings } = useSettings();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [riskChecked, setRiskChecked] = useState(false);
    const [reviewing, setReviewing] = useState(false);

    useEffect(() => {
        const sessionUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!sessionUser) {
            navigate('/');
        } else {
            CyberDB.getUser(sessionUser.email).then(freshUser => {
                setUser(freshUser || sessionUser);
            });
        }
    }, [navigate]);

    if (!user) {
        return (
            <MainLayout title="LOADING MESSAGE ANALYZER">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress color="info" />
                </Box>
            </MainLayout>
        );
    }

    const handleAnalyze = async () => {
        if (!messageText.trim()) {
            toast.warning("Please paste or type a message to analyze.");
            return;
        }

        playSound('click');
        setLoading(true);
        setResult(null);
        setRiskChecked(false);

        try {
            const data = await api.analyzeMessage(messageText);
            setResult(data);

            if (data.risk === 'SAFE') {
                playSound('correct');
            } else {
                playSound('error');
            }
        } catch (err) {
            console.error("Scam analysis failed:", err);
            toast.error("Analysis node error. Please check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsReviewed = async () => {
        if (!riskChecked || !result) return;
        playSound('click');
        setReviewing(true);

        try {
            // Update user progress with 5 XP
            const updatedUser = { ...user };
            updatedUser.score = (updatedUser.score || 0) + 5;
            updatedUser.partialProgress = updatedUser.partialProgress || {};
            
            const prevCount = updatedUser.partialProgress["ANALYZED_COUNT"] || 0;
            const newCount = prevCount + 1;
            updatedUser.partialProgress["ANALYZED_COUNT"] = newCount;
            
            await CyberDB.saveUser(updatedUser);
            setUser(updatedUser);

            toast.success(`Analysis reviewed! +5 XP synchronized.`);
            
            // Reset state
            setResult(null);
            setMessageText('');
            setRiskChecked(false);
        } catch (err) {
            console.error("Failed to save progress update:", err);
            toast.error("Error saving review activity.");
        } finally {
            setReviewing(false);
        }
    };

    const isSafe = result && result.risk === 'SAFE';

    return (
        <MainLayout title="🔍 MESSAGE ANALYZER">
            <Box className="animate-in" display="flex" flexDirection="column" gap={4} sx={{ width: '100%', pb: 6 }}>
                
                {/* Hero Header */}
                <Card 
                    className="glass-panel" 
                    elevation={0}
                    sx={{ p: 3, borderRadius: 3, border: '1px solid var(--card-border)' }}
                >
                    <Typography variant="h5" className="cyber-header" sx={{ fontSize: '1.15rem', color: 'var(--accent-color)', mb: 1 }}>
                        📡 SECURE MESSAGE SCAM INSPECT
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Roboto' }}>
                        Paste any suspicious SMS, WhatsApp message, email, or DM text. Our AI scanning model parses the payload for phishing links, fake rewards, banking scams, or engineering tactics.
                    </Typography>
                </Card>

                <Grid container spacing={4}>
                    {/* Left Column: Input text area */}
                    <Grid item xs={12} md={7}>
                        <Card className="glass-panel" elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Roboto', mb: 1.5 }}>
                                    INSPECT MESSAGE PAYLOAD
                                </Typography>
                                <TextField
                                    placeholder="Paste a suspicious message here for analysis..."
                                    multiline
                                    rows={8}
                                    fullWidth
                                    variant="outlined"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    InputProps={{
                                        sx: { 
                                            fontFamily: 'Roboto',
                                            fontSize: '0.9rem',
                                            bgcolor: settings.lightTheme ? '#ffffff' : 'rgba(255,255,255,0.02)',
                                            borderRadius: 2
                                        }
                                    }}
                                />
                            </Box>

                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    onClick={handleAnalyze}
                                    disabled={loading || reviewing}
                                    fullWidth
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontFamily: 'Orbitron',
                                        fontWeight: 'bold',
                                        color: settings.lightTheme ? '#ffffff' : '#000000',
                                        bgcolor: settings.lightTheme ? '#6200ee' : '#00f2ff',
                                        '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                                    }}
                                >
                                    {loading ? "SCANNING PAYLOAD..." : "ANALYZE MESSAGE"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Right Column: Scan results & Acknowledgement */}
                    <Grid item xs={12} md={5}>
                        <Card 
                            className="glass-panel" 
                            elevation={0} 
                            sx={{ 
                                p: 3, 
                                borderRadius: 3, 
                                minHeight: '300px', 
                                border: '1px solid var(--card-border)', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: result ? 'space-between' : 'center', 
                                alignItems: result ? 'stretch' : 'center', 
                                textAlign: result ? 'left' : 'center' 
                            }}
                        >
                            {loading ? (
                                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                    <CircularProgress size={28} sx={{ color: 'var(--accent-secondary)' }} />
                                    <Typography variant="caption" sx={{ fontFamily: 'Roboto', color: 'var(--text-muted)' }}>
                                        Consulting threat dictionary database...
                                    </Typography>
                                </Box>
                            ) : result ? (
                                <Box className="animate-in" display="flex" flexDirection="column" gap={3}>
                                    
                                    {/* Header Badge */}
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                                            SCAN THREAT MATRIX
                                        </Typography>
                                        <Chip 
                                            label={isSafe ? "SAFE" : "THREAT DETECTED"} 
                                            sx={{ 
                                                bgcolor: isSafe ? 'rgba(0, 255, 135, 0.08)' : 'rgba(255, 42, 122, 0.08)', 
                                                color: isSafe ? 'var(--success-color)' : 'var(--danger-color)', 
                                                fontWeight: 'bold', 
                                                fontSize: '0.72rem',
                                                fontFamily: 'Orbitron',
                                                border: `1px solid ${isSafe ? 'var(--success-color)' : 'var(--danger-color)'}`
                                            }} 
                                        />
                                    </Box>

                                    {/* Score Meter */}
                                    <Box sx={{ border: '1px solid rgba(255,255,255,0.04)', p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.01)' }}>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block' }}>
                                            {isSafe ? "CONFIDENCE RATING" : "PROBABILITY RISK SCORE"}
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1.5} mt={0.5} mb={1}>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={parseInt(result.confidence || 0)} 
                                                sx={{ 
                                                    height: 6, 
                                                    borderRadius: 3, 
                                                    flexGrow: 1,
                                                    bgcolor: 'rgba(255,255,255,0.05)',
                                                    '& .MuiLinearProgress-bar': { bgcolor: isSafe ? 'var(--success-color)' : 'var(--danger-color)' }
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', fontFamily: 'Orbitron', color: isSafe ? 'var(--success-color)' : 'var(--danger-color)' }}>
                                                {result.confidence}
                                            </Typography>
                                        </Box>
                                        
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block' }}>
                                            DETECTION CLASSIFICATION
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                            {result.category}
                                        </Typography>
                                    </Box>

                                    {/* Red Flags / Explanation */}
                                    {!isSafe && result.issues && result.issues.length > 0 && (
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', mb: 1 }}>
                                                DETECTED SCAM INDICATORS
                                            </Typography>
                                            {result.issues.map((issue, idx) => (
                                                <Typography key={idx} variant="body2" sx={{ fontSize: '0.8rem', color: 'var(--danger-color)', mb: 0.5, display: 'flex', gap: 1 }}>
                                                    <span>•</span> {issue}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}

                                    {/* Recommendations */}
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                                            SAFETY ADVISORY PROTOCOL
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                                            {result.recommendation}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

                                    {/* Acknowledgement section */}
                                    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.05)', bgcolor: 'rgba(255,255,255,0.01)' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                    id="risk-understand-check"
                                                    checked={riskChecked}
                                                    onChange={(e) => {
                                                        playSound('click');
                                                        setRiskChecked(e.target.checked);
                                                    }}
                                                    sx={{ 
                                                        color: 'var(--accent-color)',
                                                        '&.Mui-checked': { color: 'var(--accent-secondary)' }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography variant="caption" sx={{ color: 'var(--text-color)', fontWeight: '500', userSelect: 'none' }}>
                                                    I understand the risks identified in this message.
                                                </Typography>
                                            }
                                            sx={{ mb: 1.5, mr: 0 }}
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={handleMarkAsReviewed}
                                            disabled={!riskChecked || reviewing}
                                            fullWidth
                                            size="small"
                                            sx={{
                                                fontFamily: 'Orbitron',
                                                fontWeight: 'bold',
                                                borderRadius: 1.5,
                                                py: 1,
                                                color: '#000000',
                                                bgcolor: 'var(--success-color)',
                                                '&:hover': { bgcolor: '#ffffff', color: '#000000' }
                                            }}
                                        >
                                            {reviewing ? "SUBMITTING..." : "MARK AS REVIEWED (+5 XP)"}
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h2" sx={{ mb: 2 }}>🔍</Typography>
                                    <Typography variant="subtitle2" sx={{ color: 'var(--text-muted)' }}>
                                        Threat matrix is offline. Paste a suspicious message text and initialize analysis scan.
                                    </Typography>
                                </Box>
                            )}
                        </Card>
                    </Grid>
                </Grid>

            </Box>
        </MainLayout>
    );
}
