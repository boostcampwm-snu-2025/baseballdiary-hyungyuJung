import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KBO_TEAMS } from '../../constants/baseball';
import { baseballApi } from '../../api/baseballApi';
import { useToast } from '../../context/ToastContext';

const Header: React.FC = () => {
    const [myTeam, setMyTeam] = useState<string>('');
    const location = useLocation();
    const { showToast } = useToast();

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const team = await baseballApi.getUserTeam();
                if (team) setMyTeam(team);
            } catch (error) {
                console.error("Failed to load user team", error);
                // Silent fail for initial load or show toast? Silent is better usually, or mild.
            }
        };
        fetchTeam();
    }, []);

    const handleTeamChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTeam = e.target.value;
        setMyTeam(newTeam);
        if (newTeam) {
            try {
                await baseballApi.updateUserTeam(newTeam);
            } catch (_error) {
                showToast('Failed to update favorite team', 'error');
                // Revert state if needed? For now, we trust.
            }
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-bold text-text-accent hover:text-brand-primary transition-colors">
                    ⚾️ KBO Baseball Diary
                </Link>
                <nav className="hidden md:flex gap-4 text-sm font-medium">
                    <Link
                        to="/"
                        className={`hover:text-brand-primary transition-colors ${location.pathname === '/' ? 'text-brand-primary' : 'text-text-secondary'}`}
                    >
                        캘린더
                    </Link>
                    <Link
                        to="/statistics"
                        className={`hover:text-brand-primary transition-colors ${location.pathname === '/statistics' ? 'text-brand-primary' : 'text-text-secondary'}`}
                    >
                        기록실
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-text-secondary hidden sm:inline">My Team:</span>
                <select
                    value={myTeam}
                    onChange={handleTeamChange}
                    className="bg-bg-primary text-text-primary text-sm p-2 rounded border border-bg-tertiary focus:border-brand-primary outline-none"
                >
                    <option value="">Select Team</option>
                    {KBO_TEAMS.map(team => (
                        <option key={team} value={team}>{team}</option>
                    ))}
                </select>
            </div>
        </header>
    );
};

export default Header;
