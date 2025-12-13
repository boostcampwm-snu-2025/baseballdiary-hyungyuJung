import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onPrevMonth, onNextMonth }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    return (
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4 py-6 mt-16">
            <h2 className="text-2xl font-bold text-text-accent">
                {year}. {month}
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={onPrevMonth}
                    className="p-2 rounded-full hover:bg-bg-tertiary text-text-primary transition-colors"
                    aria-label="Previous Month"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={onNextMonth}
                    className="p-2 rounded-full hover:bg-bg-tertiary text-text-primary transition-colors"
                    aria-label="Next Month"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;
