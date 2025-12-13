import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { baseballApi } from '../api/baseballApi';
import type { StatisticsResponse, StatsData } from '../types/Diary';

const StatsCard: React.FC<{ title: string; stats: StatsData }> = ({ title, stats }) => {
    return (
        <div className="bg-bg-tertiary p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-text-accent mb-4 border-b border-bg-secondary pb-2">{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col">
                    <span className="text-sm text-text-secondary">경기 수</span>
                    <span className="text-2xl font-bold text-text-primary">{stats.games}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-text-secondary">승률</span>
                    <span className="text-2xl font-bold text-brand-primary">{(stats.winRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex flex-col col-span-2 md:col-span-2">
                    <span className="text-sm text-text-secondary">전적</span>
                    <div className="flex justify-center gap-2 items-center h-full">
                        <span className="text-accent-win font-bold">{stats.win}승</span>
                        <span className="text-text-secondary">/</span>
                        <span className="text-accent-draw font-bold">{stats.draw}무</span>
                        <span className="text-text-secondary">/</span>
                        <span className="text-accent-loss font-bold">{stats.loss}패</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-text-secondary">평균 득점</span>
                    <span className="text-xl font-mono text-text-primary">{stats.avgScore.toFixed(1)}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-text-secondary">평균 실점</span>
                    <span className="text-xl font-mono text-text-secondary">{stats.avgOpponentScore.toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
};

const StatisticsPage: React.FC = () => {
    const [stats, setStats] = useState<StatisticsResponse | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await baseballApi.getStatistics();
            setStats(data);
        };
        fetchStats();
    }, []);

    if (!stats) return <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">Loading...</div>;

    const years = Object.keys(stats.yearly).sort((a, b) => b.localeCompare(a));
    const months = Object.keys(stats.monthly).sort((a, b) => b.localeCompare(a));

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            <Header />
            <main className="container mx-auto p-4 pt-24 max-w-4xl">
                <h2 className="text-3xl font-bold text-text-accent mb-8">⚾️ 직관 기록실</h2>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-brand-primary mb-4">전체 통계</h2>
                    <StatsCard title="Lifetime" stats={stats.overall} />
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-brand-primary mb-4">연도별 통계</h2>
                    <div className="flex flex-col gap-4">
                        {years.map(year => (
                            <StatsCard key={year} title={`${year} 시즌`} stats={stats.yearly[year]} />
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-brand-primary mb-4">월별 통계</h2>
                    <div className="flex flex-col gap-4">
                        {months.map(month => (
                            <StatsCard key={month} title={month} stats={stats.monthly[month]} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StatisticsPage;
