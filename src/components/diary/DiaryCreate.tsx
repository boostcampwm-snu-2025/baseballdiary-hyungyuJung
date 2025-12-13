import React from 'react';
import type { Diary, GameResult, ViewingType } from '../../types/Diary';
import { KBO_TEAMS, VIEWING_TYPES } from '../../constants/baseball';
import { formatDate } from '../../utils/dateUtils';

interface DiaryCreateProps {
    date: Date;
    onCancel: () => void;
    onSubmit: (diary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const DiaryCreate: React.FC<DiaryCreateProps> = ({ date, onCancel, onSubmit }) => {
    // Local state for form fields
    const [myTeam, setMyTeam] = React.useState('');
    const [opponentTeam, setOpponentTeam] = React.useState('');
    const [myScore, setMyScore] = React.useState<number>(0);
    const [opponentScore, setOpponentScore] = React.useState<number>(0);
    const [result, setResult] = React.useState<GameResult>('win');
    const [stadium, setStadium] = React.useState('');
    const [broadcaster, setBroadcaster] = React.useState('');
    const [viewingType, setViewingType] = React.useState<ViewingType>('home');
    const [content, setContent] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDiary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'> = {
            date,
            gameInfo: {
                myTeam,
                opponentTeam,
                myScore,
                opponentScore,
                result,
                stadium,
                broadcaster
            },
            viewingInfo: {
                type: viewingType
            },
            content,
            photoUrl: undefined, // Optional
        };
        onSubmit(newDiary);
    };

    const formattedDate = formatDate(date.getFullYear(), date.getMonth(), date.getDate());

    return (
        <div className="h-full flex flex-col">
            <div className="flex-none p-6 border-b border-bg-tertiary">
                <h2 className="text-2xl font-bold text-text-accent flex items-center justify-between">
                    <span>{formattedDate} 일기 작성</span>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl mx-auto">

                    {/* Section 1: Game Info */}
                    <section className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-brand-primary border-l-4 border-brand-primary pl-3">경기 정보</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">응원 팀</label>
                                <select
                                    value={myTeam} onChange={(e) => setMyTeam(e.target.value)}
                                    className="bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none"
                                >
                                    <option value="">팀 선택</option>
                                    {KBO_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">상대 팀</label>
                                <select
                                    value={opponentTeam} onChange={(e) => setOpponentTeam(e.target.value)}
                                    className="bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none"
                                >
                                    <option value="">팀 선택</option>
                                    {KBO_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-text-secondary w-16">우리 점수</label>
                                <input
                                    type="number" value={myScore} onChange={(e) => setMyScore(Number(e.target.value))}
                                    className="w-full bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none text-center font-mono text-lg"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-text-secondary w-16">상대 점수</label>
                                <input
                                    type="number" value={opponentScore} onChange={(e) => setOpponentScore(Number(e.target.value))}
                                    className="w-full bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none text-center font-mono text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-secondary">결과</label>
                            <div className="flex gap-2">
                                {['win', 'draw', 'loss', 'cancel'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setResult(r as GameResult)}
                                        className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-[1.02] ${result === r ?
                                            (r === 'win' ? 'bg-accent-win text-white' :
                                                r === 'loss' ? 'bg-accent-loss text-white' :
                                                    r === 'draw' ? 'bg-accent-draw text-black' : 'bg-accent-cancel text-white')
                                            : 'bg-bg-tertiary text-text-secondary'}`}
                                    >
                                        {r === 'win' ? '승리' : r === 'loss' ? '패배' : r === 'draw' ? '무승부' : '취소'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">구장</label>
                                <input
                                    type="text" value={stadium} onChange={(e) => setStadium(e.target.value)} placeholder="예: 잠실 야구장"
                                    className="bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">방송사</label>
                                <input
                                    type="text" value={broadcaster} onChange={(e) => setBroadcaster(e.target.value)} placeholder="예: SPOTV"
                                    className="bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    <hr className="border-bg-tertiary opacity-50" />

                    {/* Section 2: Viewing Info */}
                    <section className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-brand-primary border-l-4 border-brand-primary pl-3">관람 정보</h3>
                        <div className="flex flex-wrap gap-3">
                            {VIEWING_TYPES.map((type) => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setViewingType(type.value as ViewingType)}
                                    className={`px-4 py-2 rounded-full border transition-colors ${viewingType === type.value ? 'bg-brand-primary border-brand-primary text-white' : 'bg-transparent border-bg-tertiary text-text-secondary hover:border-brand-primary'}`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    <hr className="border-bg-tertiary opacity-50" />

                    {/* Section 3: Content & Photo */}
                    <section className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-brand-primary border-l-4 border-brand-primary pl-3">나의 기록</h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-secondary">사진 첨부</label>
                            <div className="h-32 bg-bg-tertiary rounded-lg border-2 border-dashed border-bg-secondary flex items-center justify-center text-text-secondary cursor-not-allowed">
                                <span>📷 사진 업로드 기능 준비중</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-secondary">메모</label>
                            <textarea
                                value={content} onChange={(e) => setContent(e.target.value)}
                                className="w-full h-40 bg-bg-tertiary text-text-primary p-4 rounded-lg border border-transparent focus:border-brand-primary outline-none resize-none leading-relaxed"
                                placeholder="오늘 경기의 승부처는 어디였나요?"
                            />
                        </div>
                    </section>

                    <div className="h-20"></div> {/* Spacer */}
                </form>
            </div>

            <div className="flex-none p-6 border-t border-bg-tertiary bg-bg-secondary flex justify-end gap-3 z-10">
                <button
                    onClick={onCancel}
                    className="px-8 py-3 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors font-medium"
                >
                    취소
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-8 py-3 rounded-lg bg-brand-primary text-white font-bold hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-brand-primary/20"
                >
                    저장하기
                </button>
            </div>
        </div>
    );
};

export default DiaryCreate;
