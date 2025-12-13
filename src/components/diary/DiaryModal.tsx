import React from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import DiaryCreate from './DiaryCreate';
import DiaryRead from './DiaryRead';
import DiaryEdit from './DiaryEdit';


interface DiaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date | null;
}

type DiaryMode = 'create' | 'read' | 'edit';

const DiaryModal: React.FC<DiaryModalProps> = ({ isOpen, onClose, selectedDate }) => {
    const [mode, setMode] = React.useState<DiaryMode>('create');
    // Mock data existence check - in future this will check if diary exists for selectedDate
    const hasExistingDiary = false;

    React.useEffect(() => {
        if (isOpen) {
            setMode(hasExistingDiary ? 'read' : 'create');
        }
    }, [isOpen, selectedDate, hasExistingDiary]);

    if (!isOpen || !selectedDate) return null;

    const renderContent = () => {
        switch (mode) {
            case 'create':
                return (
                    <DiaryCreate
                        date={selectedDate}
                        onCancel={onClose}
                        onSubmit={(data) => {
                            console.log('Diary Created:', data);
                            onClose();
                        }}
                    />
                );
            case 'read':
                return (
                    <DiaryRead
                        onEdit={() => setMode('edit')}
                        onClose={onClose}
                    />
                );
            case 'edit':
                return (
                    <DiaryEdit
                        onCancel={() => setMode('read')}
                    />
                );
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Container - Expanded Size */}
            <div className="relative w-11/12 max-w-6xl h-[85vh] bg-bg-secondary rounded-2xl shadow-2xl flex flex-col transform transition-all animate-fade-in-up overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 text-text-secondary hover:text-text-primary transition-colors bg-bg-secondary/50 rounded-full p-2"
                >
                    <FaTimes size={24} />
                </button>

                {renderContent()}
            </div>
        </div>,
        document.body
    );
};

export default DiaryModal;
