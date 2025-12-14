import React, { useEffect, useState } from 'react';
import type { DiarySummary } from '../../types/Diary';
import { baseballApi } from '../../api/baseballApi';
import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '../../utils/dateUtils';
import { useToast } from '../../context/ToastContext';
import { getTeamDisplay } from '../../constants/baseball';

interface CalendarGridProps {
    currentDate: Date;
    onDateClick: (date: Date) => void;
    refreshKey?: number;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, onDateClick, refreshKey }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const { showToast } = useToast();

    const [summaries, setSummaries] = useState<DiarySummary[]>([]);

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                const data = await baseballApi.getMonthlySummaries(year, month + 1);
                setSummaries(data);
            } catch (error) {
                console.error(error);
                showToast('Failed to load calendar summaries', 'error');
            }
        };
        fetchSummaries();
    }, [year, month, refreshKey, showToast]);

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
                                        <div className="mt-2 flex flex-col items-center justify-center relative h-full">
                                            {/* Corner Indicator */}
                                            <div className={`absolute top-0 right-0 w-3 h-3 rounded-full 
                                                ${summary.result === 'win' ? 'bg-accent-win' :
                                                    summary.result === 'loss' ? 'bg-accent-loss' :
                                                        summary.result === 'draw' ? 'bg-accent-draw' : 'bg-gray-400'}
                                            `}></div>

                                            <div className="text-sm font-bold text-text-primary truncate w-full text-center">
                                                {getTeamDisplay(summary.opponentTeam)}
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
