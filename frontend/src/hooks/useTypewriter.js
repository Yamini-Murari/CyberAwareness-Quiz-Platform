import { useState, useEffect } from 'react';
import { playSound } from '../services/audioService';

export function useTypewriter(text, speed = 30) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (!text) {
            setDisplayText('');
            return;
        }

        setDisplayText('');
        let i = 0;
        
        const interval = setInterval(() => {
            setDisplayText((prev) => {
                if (i < text.length) {
                    const char = text.charAt(i);
                    i++;
                    if (i % 2 === 0) {
                        playSound('typing');
                    }
                    return prev + char;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayText;
}
