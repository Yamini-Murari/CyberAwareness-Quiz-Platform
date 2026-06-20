import React, { createContext, useContext, useState, useEffect } from 'react';
import { CyberDB } from '../services/cyberDb';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem('uiSettings');
            return saved ? JSON.parse(saved) : {
                largeText: false,
                friendlyIcons: false,
                highContrast: false,
                lightTheme: false,
                sounds: true
            };
        } catch (e) {
            return {
                largeText: false,
                friendlyIcons: false,
                highContrast: false,
                lightTheme: false,
                sounds: true
            };
        }
    });

    useEffect(() => {
        // Sync body classes with settings
        document.body.classList.toggle('large-text', !!settings.largeText);
        document.body.classList.toggle('friendly-icons', !!settings.friendlyIcons);
        document.body.classList.toggle('high-contrast', !!settings.highContrast);
        document.body.classList.toggle('light-theme', !!settings.lightTheme);

        localStorage.setItem('uiSettings', JSON.stringify(settings));
    }, [settings]);

    // Load initial user settings when current user changes (e.g. login)
    const loadUserPreferences = async () => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (currentUser && currentUser.email) {
                const user = await CyberDB.getUser(currentUser.email);
                if (user && user.settings) {
                    setSettings(prev => ({
                        ...prev,
                        largeText: !!user.settings.largeText,
                        friendlyIcons: !!user.settings.friendlyIcons,
                        highContrast: !!user.settings.highContrast,
                        lightTheme: !!user.settings.lightTheme,
                        sounds: user.settings.sounds !== false
                    }));
                }
            }
        } catch (e) {}
    };

    const updateSetting = async (key, val) => {
        setSettings(prev => {
            const updated = { ...prev, [key]: val };
            
            // Sync with current user settings in database if logged in
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
                if (currentUser && currentUser.email) {
                    CyberDB.getUser(currentUser.email).then(user => {
                        if (user) {
                            user.settings = user.settings || {};
                            user.settings[key] = val;
                            CyberDB.saveUser(user);
                        }
                    });
                }
            } catch (e) {}

            return updated;
        });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSetting, loadUserPreferences }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
