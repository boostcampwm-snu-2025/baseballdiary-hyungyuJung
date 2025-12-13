import React from 'react';
import Header from '../components/layout/Header';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';

import DiaryModal from '../components/diary/DiaryModal';

const HomePage: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

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
                />
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
