import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-bg-secondary border-b border-bg-tertiary flex items-center px-4 z-50">
            <h1 className="text-xl font-bold text-text-accent">
                ⚾️ KBO Baseball Diary
            </h1>
        </header>
    );
};

export default Header;
