import React from 'react';

export default function ScanlineBackground({ children }) {
    return (
        <div className="main-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {children}
        </div>
    );
}
