import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <div className={`fixed top-4 right-4 z-[9999] ${bgColors[type]} text-white px-6 py-3 rounded shadow-lg flex items-center gap-2 animate-fade-in-down`}>
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-80">
                ✕
            </button>
        </div>
    );
};

export default Toast;
