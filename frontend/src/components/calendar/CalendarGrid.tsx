import React, { useEffect, useState } from 'react';
import type { DiarySummary } from '../../types/Diary';
import { baseballApi } from '../../api/baseballApi';
import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '../../utils/dateUtils';

interface CalendarGridProps {
    currentDate: Date;
    onDateClick: (date: Date) => void;
    refreshKey?: number;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, onDateClick, refreshKey }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const [summaries, setSummaries] = useState<DiarySummary[]>([]);

    useEffect(() => {
        const fetchSummaries = async () => {
            // month is 0-indexed in Date, but 1-indexed in API usually. 
            // My API expects 1-based month.
            const data = await baseballApi.getMonthlySummaries(year, month + 1);
            setSummaries(data);
        };
        fetchSummaries();
    }, [year, month, refreshKey]);

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Fill empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }

    // Fill actual days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Helper to find summary
    const getSummaryForDay = (day: number) => {
        const dateStr = formatDate(year, month, day);
        return summaries.find(s => s.date === dateStr);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-text-secondary text-sm py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-1 bg-bg-tertiary rounded-lg overflow-hidden border border-bg-tertiary">
                {days.map((day, index) => {
                    const summary = day ? getSummaryForDay(day) : null;

                    return (
                        <div
                            key={index}
                            onClick={() => {
                                if (day) {
                                    const clickedDate = new Date(year, month, day);
                                    onDateClick(clickedDate);
                                }
                            }}
                            className={`${day ? 'bg-bg-secondary hover:bg-bg-tertiary cursor-pointer' : ''} h-24 p-2 relative transition-colors flex flex-col`}
                        >
                            {day && (
                                <>
                                    <span className={`text-sm ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'text-brand-primary font-bold' : 'text-text-primary'}`}>
                                        {day}
                                    </span>

                                    {summary && (
                                        <div className={`mt-1 p-1 rounded-md w-full text-center
                                            ${summary.result === 'win' ? 'bg-accent-win text-white' :
                                                summary.result === 'loss' ? 'bg-accent-loss text-white' :
                                                    summary.result === 'draw' ? 'bg-accent-draw text-black' : 'bg-gray-400 text-white'}
                                        `}>
                                            <div className="text-[10px] font-bold leading-tight">
                                                {summary.result === 'win' ? '승리' :
                                                    summary.result === 'loss' ? '패배' :
                                                        summary.result === 'draw' ? '무승부' : '-'}
                                            </div>
                                            <div className="text-[10px] truncate leading-tight opacity-90">
                                                {summary.opponentTeam}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;
