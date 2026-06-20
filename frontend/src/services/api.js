const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
    }
    return response.json();
}

export const api = {
    async signup(email, username, password) {
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });
        return handleResponse(res);
    },

    async login(identifier, password) {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });
        return handleResponse(res);
    },

    async getUser(email) {
        const res = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(email)}`);
        return handleResponse(res);
    },

    async saveUser(user) {
        const res = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return handleResponse(res);
    },

    async updateProgress(email, missionType, scoreIncrease, isCompleted) {
        const res = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(email)}/progress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ missionType, scoreIncrease, isCompleted })
        });
        return handleResponse(res);
    },

    async getAllUsers() {
        const res = await fetch(`${API_BASE_URL}/api/users`);
        return handleResponse(res);
    },

    async deleteUser(email) {
        const res = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(email)}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${res.status}`);
        }
        return true;
    },

    async analyzeMessage(message) {
        const res = await fetch(`${API_BASE_URL}/api/message/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        return handleResponse(res);
    }
};
