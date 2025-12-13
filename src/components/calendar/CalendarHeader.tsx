import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarHeader: React.FC = () => {
    return (
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4 py-6 mt-16">
            <h2 className="text-2xl font-bold text-text-accent">
                2025. 11
            </h2>
            <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-bg-tertiary text-text-primary transition-colors">
                    <FaChevronLeft />
                </button>
                <button className="p-2 rounded-full hover:bg-bg-tertiary text-text-primary transition-colors">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;
