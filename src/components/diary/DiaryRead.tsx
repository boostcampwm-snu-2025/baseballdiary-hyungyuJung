import React from 'react';

// Placeholder for Read View
interface DiaryReadProps {
    onEdit: () => void;
    onClose: () => void;
}

const DiaryRead: React.FC<DiaryReadProps> = ({ onEdit, onClose }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-text-secondary p-10">
            <h2 className="text-2xl font-bold mb-4">일기 읽기 모드</h2>
            <p className="mb-8">아직 작성된 일기가 없습니다. (UI Placeholder)</p>

            <div className="flex gap-4">
                <button onClick={onClose} className="px-6 py-2 rounded-lg bg-bg-tertiary">닫기</button>
                <button onClick={onEdit} className="px-6 py-2 rounded-lg bg-brand-primary text-white">수정하기</button>
            </div>
        </div>
    );
};

export default DiaryRead;
