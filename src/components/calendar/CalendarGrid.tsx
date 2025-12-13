import React from 'react';

const CalendarGrid: React.FC = () => {
    // Placeholder for calendar grid logic
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dummyDays = Array.from({ length: 35 }, (_, i) => i + 1); // 5 weeks * 7 days

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
                {dummyDays.map((day) => (
                    <div
                        key={day}
                        className="bg-bg-secondary h-24 p-2 hover:bg-bg-tertiary cursor-pointer transition-colors relative"
                    >
                        <span className={`text-sm ${day === 15 ? 'text-brand-primary font-bold' : 'text-text-primary'}`}>
                            {day > 30 ? '' : day}
                        </span>
                        {/* Example of data indicator */}
                        {day === 15 && (
                            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-accent-win"></div>
                        )}
                        {day === 22 && (
                            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-accent-loss"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarGrid;
