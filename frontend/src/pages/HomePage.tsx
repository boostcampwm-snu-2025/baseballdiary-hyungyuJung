import React from 'react';
import Header from '../components/layout/Header';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';

import DiaryModal from '../components/diary/DiaryModal';

const HomePage: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [refreshKey, setRefreshKey] = React.useState(0);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setRefreshKey(prev => prev + 1); // Trigger calendar refresh
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            <Header />
            <main className="container mx-auto pb-10">
                <CalendarHeader
                    currentDate={currentDate}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />
                <CalendarGrid
                    currentDate={currentDate}
                    onDateClick={handleDateClick}
                    refreshKey={refreshKey}
                />

                {/* Result Legend */}
                <div className="flex justify-start gap-4 mt-6 max-w-4xl mx-auto px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent-win"></div>
                        <span className="text-xs text-text-secondary">승리</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent-draw"></div>
                        <span className="text-xs text-text-secondary">무승부</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent-loss"></div>
                        <span className="text-xs text-text-secondary">패배</span>
                    </div>
                </div>
            </main>

            <DiaryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default HomePage;
