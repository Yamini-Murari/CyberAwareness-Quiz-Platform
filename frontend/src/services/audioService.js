const soundUrls = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    correct: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
    typing: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
};

// Create Audio elements lazily to avoid loading them if browser blocks initial creation
let loadedAudios = {};

function getAudio(name) {
    if (!loadedAudios[name] && soundUrls[name]) {
        loadedAudios[name] = new Audio(soundUrls[name]);
    }
    return loadedAudios[name];
}

export function playSound(name) {
    try {
        const settings = JSON.parse(localStorage.getItem('uiSettings') || '{}');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        // Settings could be in uiSettings or user settings
        const soundsEnabled = settings.sounds !== false; // enabled by default
        
        if (soundsEnabled) {
            const audio = getAudio(name);
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(() => {
                    // Ignore autoplay restriction errors
                });
            }
        }
    } catch (e) {
        // Ignore JSON or web API errors
    }
}
