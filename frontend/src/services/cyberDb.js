import { api } from './api';

function normalizeEmail(email) {
    return (email || '').trim().toLowerCase();
}

export class CyberDB {
    static async getUser(email) {
        const em = normalizeEmail(email);
        try {
            // Fetch from backend API
            const user = await api.getUser(em);
            if (user) {
                localStorage.setItem(em, JSON.stringify(user));
            }
            return user;
        } catch (err) {
            console.warn("Backend offline or error. Falling back to LocalStorage:", err.message);
            // Fallback to local storage cache
            try {
                return JSON.parse(localStorage.getItem(em) || 'null');
            } catch (e) {
                return null;
            }
        }
    }

    static async saveUser(user) {
        if (!user || !user.email) return;
        const em = normalizeEmail(user.email);
        
        // Sync locally first
        localStorage.setItem(em, JSON.stringify(user));
        try {
            const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (current && normalizeEmail(current.email) === em) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        } catch (e) {}

        // Send to backend API
        try {
            const savedUser = await api.saveUser(user);
            if (savedUser) {
                localStorage.setItem(em, JSON.stringify(savedUser));
            }
        } catch (err) {
            console.error("Failed to sync profile update with backend:", err.message);
        }
    }

    static async signup(email, username, password) {
        // Create profile on the backend
        const user = await api.signup(email, username, password);
        
        // Save to local cache
        if (user && user.email) {
            const em = normalizeEmail(user.email);
            localStorage.setItem(em, JSON.stringify(user));
        }
        return user;
    }

    static async login(identifier, password) {
        // Authenticate with the backend
        const user = await api.login(identifier, password);
        
        // Store in session cache
        if (user && user.email) {
            const em = normalizeEmail(user.email);
            localStorage.setItem(em, JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
    }

    static async updateProgress(email, missionType, scoreIncrease, isCompleted) {
        const em = normalizeEmail(email);
        
        try {
            // Report to backend API
            const user = await api.updateProgress(em, missionType, scoreIncrease, isCompleted);
            if (user) {
                localStorage.setItem(em, JSON.stringify(user));
                // Update session
                try {
                    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
                    if (current && normalizeEmail(current.email) === em) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                } catch (e) {}
            }
            return user;
        } catch (err) {
            console.warn("Failed to report progress to backend. Saving to LocalStorage cache:", err.message);
            
            // Fallback local update
            const user = await this.getUser(em);
            if (!user) return null;

            user.score = (user.score || 0) + (scoreIncrease || 0);
            
            if (isCompleted && missionType) {
                user.missionsCompleted = (user.missionsCompleted || 0) + 1;
                user.completedMissionsList = user.completedMissionsList || [];
                if (!user.completedMissionsList.includes(missionType)) {
                    user.completedMissionsList.push(missionType);
                }
            }
            
            await this.saveUser(user);
            return user;
        }
    }

    static async getAllUsers() {
        try {
            const users = await api.getAllUsers();
            if (users && Array.isArray(users)) {
                users.forEach(u => {
                    if (u.email) {
                        localStorage.setItem(normalizeEmail(u.email), JSON.stringify(u));
                    }
                });
            }
            return users;
        } catch (err) {
            console.warn("Backend offline or error. Falling back to local storage scan:", err.message);
            const users = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.includes('@') && key !== 'currentUser' && key !== 'uiSettings') {
                    try {
                        const u = JSON.parse(localStorage.getItem(key));
                        if (u && u.email) users.push(u);
                    } catch (e) {}
                }
            }
            return users;
        }
    }

    static async deleteUser(email) {
        const em = normalizeEmail(email);
        localStorage.removeItem(em);
        try {
            await api.deleteUser(em);
        } catch (err) {
            console.error("Failed to delete user from backend:", err.message);
        }
    }
}
