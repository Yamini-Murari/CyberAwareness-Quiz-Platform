import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context & Custom Hooks
import { SettingsProvider, useSettings } from './hooks/useSettings';

// Layout & Components
import ScanlineBackground from './components/ScanlineBackground';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import GameArena from './pages/GameArena';
import Progress from './pages/Progress';
import Leaderboard from './pages/Leaderboard';
import MessageAnalyzer from './pages/MessageAnalyzer';
import Profile from './pages/Profile';

// Theme creator
const makeTheme = (lightTheme) => {
    return createTheme({
        palette: {
            mode: lightTheme ? 'light' : 'dark',
            primary: {
                main: lightTheme ? '#6200ee' : '#9d4edd',
            },
            secondary: {
                main: lightTheme ? '#008c95' : '#00f2ff',
            },
            info: {
                main: lightTheme ? '#6200ee' : '#9d4edd',
            },
            background: {
                default: lightTheme ? '#f3f0fc' : '#08051a',
                paper: lightTheme ? '#ffffff' : '#110a29',
            },
            text: {
                primary: lightTheme ? '#1a0b36' : '#ffffff',
                secondary: lightTheme ? '#5e527a' : '#c2c0e0',
            }
        },
        typography: {
            fontFamily: "'Roboto', sans-serif",
            h1: { fontFamily: "'Orbitron', sans-serif" },
            h2: { fontFamily: "'Orbitron', sans-serif" },
            h3: { fontFamily: "'Orbitron', sans-serif" },
            h4: { fontFamily: "'Orbitron', sans-serif" },
            h5: { fontFamily: "'Orbitron', sans-serif" },
            h6: { fontFamily: "'Orbitron', sans-serif" },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 8
                    }
                }
            }
        }
    });
};

function AppContent() {
    const { settings } = useSettings();
    const theme = makeTheme(settings.lightTheme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ScanlineBackground>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/missions" element={<Missions />} />
                        <Route path="/game/:type" element={<GameArena />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/analyzer" element={<MessageAnalyzer />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer 
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={settings.lightTheme ? 'light' : 'dark'}
                />
            </ScanlineBackground>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <SettingsProvider>
            <AppContent />
        </SettingsProvider>
    );
}
