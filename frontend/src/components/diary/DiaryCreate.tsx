import React, { useEffect, useState } from 'react';
import type { Diary, GameResult } from '../../types/Diary';
import { KBO_TEAMS, VIEWING_TYPES } from '../../constants/baseball';
import { baseballApi } from '../../api/baseballApi';
import { formatDate } from '../../utils/dateUtils';
import { useToast } from '../../context/ToastContext';

interface DiaryCreateProps {
    date: Date;
    onCancel: () => void;
    onSubmit: (diary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const DiaryCreate: React.FC<DiaryCreateProps> = ({ date, onCancel, onSubmit }) => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState<Partial<Diary>>({
        date: formatDate(date.getFullYear(), date.getMonth(), date.getDate()),
        gameInfo: {
            myTeam: '',
            opponentTeam: '',
            myScore: 0,
            opponentScore: 0,
            result: 'win',
            stadium: '',
            broadcaster: '',
        },
        viewingInfo: {
            type: 'home',
        },
        content: '',
        photoUrl: undefined,
    });

    // Auto-Fill Data on Mount
    useEffect(() => {
        const fetchGameData = async () => {
            if (!formData.date) return;
            try {
                const dateStr = formData.date;
                const data = await baseballApi.getRandomGame(dateStr);
                if (data) {
                    setFormData(prev => ({
                        ...prev,
                        gameInfo: {
                            ...prev.gameInfo!,
                            myTeam: data.myTeam,
                            opponentTeam: data.opponentTeam,
                            myScore: data.myScore,
                            opponentScore: data.opponentScore,
                            result: data.result as GameResult,
                            stadium: data.stadium,
                            broadcaster: data.broadcaster
                        }
                    }));
                }
            } catch (error) {
                console.warn("Auto-fill failed", error);
                // showToast("Could not auto-fill game data", 'info');
            }
        };
        fetchGameData();
    }, [formData.date, showToast]);

    const handleInputChange = (field: keyof Diary, value: any, subField?: string) => {
        setFormData(prev => {
            if (subField) {
                return {
                    ...prev,
                    [field]: {
                        ...(prev[field as keyof Diary] as object),
                        [subField]: value
                    }
                };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure all required fields are present before submitting
        if (!formData.date || !formData.gameInfo || !formData.viewingInfo || formData.content === undefined) {
            showToast("Please fill in all required fields.", 'error');
            return;
        }

        const newDiary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'> = {
            date: formData.date,
            gameInfo: formData.gameInfo as any, // Type assertion for safety
            viewingInfo: formData.viewingInfo as any,
            content: formData.content,
            photoUrl: formData.photoUrl,
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
                                    value={formData.gameInfo?.myTeam || ''}
                                    onChange={(e) => handleInputChange('gameInfo', e.target.value, 'myTeam')}
                                    className="bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none"
                                >
                                    <option value="">팀 선택</option>
                                    {KBO_TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">상대 팀</label>
                                <select
                                    value={formData.gameInfo?.opponentTeam || ''}
                                    onChange={(e) => handleInputChange('gameInfo', e.target.value, 'opponentTeam')}
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
                                    type="number"
                                    value={formData.gameInfo?.myScore || 0}
                                    onChange={(e) => handleInputChange('gameInfo', Number(e.target.value), 'myScore')}
                                    className="w-full bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none text-center font-mono text-lg"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-text-secondary w-16">상대 점수</label>
                                <input
                                    type="number"
                                    value={formData.gameInfo?.opponentScore || 0}
                                    onChange={(e) => handleInputChange('gameInfo', Number(e.target.value), 'opponentScore')}
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
                                        onClick={() => handleInputChange('gameInfo', r, 'result')}
                                        className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-[1.02] ${formData.gameInfo?.result === r ?
                                            (r === 'win' ? 'bg-accent-win text-white' :
                                                r === 'loss' ? 'bg-accent-loss text-white' :
                                                    r === 'draw' ? 'bg-accent-draw text-black' : 'bg-accent-cancel text-white')
                                            : 'bg-bg-tertiary text-text-secondary'
                                            } `}
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
                                    type="text"
                                    value={formData.gameInfo?.stadium || ''}
                                    onChange={(e) => handleInputChange('gameInfo', e.target.value, 'stadium')}
                                    placeholder="예: 잠실 야구장"
                                    className="bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-secondary">방송사</label>
                                <input
                                    type="text"
                                    value={formData.gameInfo?.broadcaster || ''}
                                    onChange={(e) => handleInputChange('gameInfo', e.target.value, 'broadcaster')}
                                    placeholder="예: SPOTV"
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
                                    onClick={() => handleInputChange('viewingInfo', type.value, 'type')}
                                    className={`px-4 py-2 rounded-full border transition-colors ${formData.viewingInfo?.type === type.value ? 'bg-brand-primary border-brand-primary text-white' : 'bg-transparent border-bg-tertiary text-text-secondary hover:border-brand-primary'} `}
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
                                value={formData.content || ''}
                                onChange={(e) => handleInputChange('content', e.target.value)}
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
