import React from 'react';
import type { Diary } from '../../types/Diary';
import { formatDate } from '../../utils/dateUtils';
import { VIEWING_TYPES, getTeamDisplay } from '../../constants/baseball';

interface DiaryReadProps {
    diary: Diary;
    onEdit: () => void;
    onClose: () => void;
    onDelete: () => Promise<void>;
}

const DiaryRead: React.FC<DiaryReadProps> = ({ diary, onEdit, onClose, onDelete }) => {
    const { date, gameInfo, viewingInfo, content } = diary;
    const dateObj = new Date(date);
    const formattedDate = formatDate(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    const resultColor =
        gameInfo.result === 'win' ? 'text-accent-win' :
            gameInfo.result === 'loss' ? 'text-accent-loss' :
                gameInfo.result === 'draw' ? 'text-accent-draw' : 'text-accent-cancel';

    const resultText =
        gameInfo.result === 'win' ? '승리' :
            gameInfo.result === 'loss' ? '패배' :
                gameInfo.result === 'draw' ? '무승부' : '취소';

    const viewingLabel = VIEWING_TYPES.find(v => v.value === viewingInfo.type)?.label || viewingInfo.type;

    const handleDelete = async () => {
        if (confirm('정말로 이 일기를 삭제하시겠습니까?')) {
            await onDelete();
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-none p-6 border-b border-bg-tertiary flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-text-accent">
                        {formattedDate} 일기
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${resultColor} bg-bg-tertiary`}>
                        {resultText}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide flex flex-col gap-8">

                {/* Scoreboard */}
                <section className="bg-bg-tertiary rounded-2xl p-6 flex flex-col items-center gap-4">
                    <div className="flex w-full justify-between items-center max-w-lg">
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <span className="text-lg font-bold text-text-primary">{getTeamDisplay(gameInfo.myTeam)}</span>
                            <span className={`text-4xl font-mono font-bold ${gameInfo.myScore > gameInfo.opponentScore ? 'text-brand-primary' : 'text-text-secondary'}`}>
                                {gameInfo.myScore}
                            </span>
                        </div>
                        <div className="text-text-secondary font-bold text-xl">VS</div>
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <span className="text-lg font-bold text-text-primary">{getTeamDisplay(gameInfo.opponentTeam)}</span>
                            <span className={`text-4xl font-mono font-bold ${gameInfo.opponentScore > gameInfo.myScore ? 'text-brand-primary' : 'text-text-secondary'}`}>
                                {gameInfo.opponentScore}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-text-secondary mt-2">
                        {gameInfo.stadium} | {gameInfo.broadcaster}
                    </div>
                </section>

                {/* Viewing Info */}
                <section>
                    <h3 className="text-lg font-bold text-brand-primary mb-3">관람 정보</h3>
                    <span className="px-3 py-1 bg-bg-tertiary rounded-lg text-text-primary">
                        {viewingLabel}
                    </span>
                </section>

                {/* Memo */}
                <section className="flex-1">
                    <h3 className="text-lg font-bold text-brand-primary mb-3">나의 기록</h3>
                    <div className="bg-bg-tertiary p-6 rounded-xl text-text-primary whitespace-pre-wrap leading-relaxed min-h-[150px]">
                        {content}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="flex-none p-6 border-t border-bg-tertiary bg-bg-secondary flex justify-between items-center z-10">
                <button
                    onClick={handleDelete}
                    className="text-accent-loss text-sm hover:underline px-2"
                >
                    일기 삭제하기
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
                    >
                        닫기
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-brand-primary/20"
                    >
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiaryRead;
