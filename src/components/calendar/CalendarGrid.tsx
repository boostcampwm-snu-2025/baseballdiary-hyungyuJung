import React from 'react';

import { getDaysInMonth, getFirstDayOfMonth } from '../../utils/dateUtils';

interface CalendarGridProps {
    currentDate: Date;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

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

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`bg-bg-secondary h-24 p-2 relative ${day ? 'hover:bg-bg-tertiary cursor-pointer transition-colors' : ''}`}
                    >
                        {day && (
                            <>
                                <span className={`text-sm ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'text-brand-primary font-bold' : 'text-text-primary'}`}>
                                    {day}
                                </span>
                                {/* 
                  Placeholder for future data indicators:
                  The win/loss dots will be rendered here based on data props later.
                */}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarGrid;
