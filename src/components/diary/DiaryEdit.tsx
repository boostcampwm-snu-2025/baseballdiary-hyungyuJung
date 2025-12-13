import React from 'react';

// Placeholder for Edit View
interface DiaryEditProps {
    onCancel: () => void;
}

const DiaryEdit: React.FC<DiaryEditProps> = ({ onCancel }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-text-secondary p-10">
            <h2 className="text-2xl font-bold mb-4">일기 수정 모드</h2>
            <p className="mb-8">수정 기능 준비중 (UI Placeholder)</p>
            <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-bg-tertiary">취소</button>
        </div>
    );
};

export default DiaryEdit;
