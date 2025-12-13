import React from 'react';
import Header from '../components/layout/Header';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            <Header />
            <main className="container mx-auto pb-10">
                <CalendarHeader />
                <CalendarGrid />
            </main>
        </div>
    );
};

export default HomePage;
