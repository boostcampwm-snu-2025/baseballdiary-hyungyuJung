import React from 'react';
import { formatDate } from '../../utils/dateUtils';

export interface DiaryEntryData {
    date: Date;
    result: 'win' | 'loss' | 'draw' | null;
    // Add other fields as they are implemented
}

interface DiaryFormProps {
    date: Date;
    onCancel: () => void;
    onSubmit: (data: DiaryEntryData) => void;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ date, onCancel, onSubmit }) => {
    const [result, setResult] = React.useState<'win' | 'loss' | 'draw' | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            date,
            result,
        });
    };

    const formattedDate = formatDate(date.getFullYear(), date.getMonth(), date.getDate());

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="text-center">
                <h3 className="text-xl font-bold text-text-accent">{formattedDate}</h3>
                <p className="text-text-secondary text-sm">경기 기록을 작성해주세요</p>
            </div>

            {/* Team Selection Placeholder */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-primary">응원 팀 선택</label>
                <select className="w-full bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none">
                    <option>팀 선택 (Coming Soon)</option>
                </select>
            </div>

            {/* Game Result */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-primary">경기 결과</label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setResult('win')}
                        className={`flex-1 py-3 rounded-lg font-bold transition-colors ${result === 'win' ? 'bg-accent-win text-white' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'}`}
                    >
                        승리
                    </button>
                    <button
                        type="button"
                        onClick={() => setResult('draw')}
                        className={`flex-1 py-3 rounded-lg font-bold transition-colors ${result === 'draw' ? 'bg-accent-draw text-black' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'}`}
                    >
                        무승부
                    </button>
                    <button
                        type="button"
                        onClick={() => setResult('loss')}
                        className={`flex-1 py-3 rounded-lg font-bold transition-colors ${result === 'loss' ? 'bg-accent-loss text-white' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'}`}
                    >
                        패배
                    </button>
                </div>
            </div>

            {/* Memo */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-primary">메모</label>
                <textarea
                    placeholder="오늘 경기는 어땠나요?"
                    className="w-full h-32 bg-bg-tertiary text-text-primary p-3 rounded-lg border border-transparent focus:border-brand-primary outline-none resize-none"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-opacity-90 transition-colors"
                >
                    저장하기
                </button>
            </div>
        </form>
    );
};

export default DiaryForm;
