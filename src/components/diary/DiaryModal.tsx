import React from 'react';
import { createPortal } from 'react-dom';
import DiaryForm from './DiaryForm';
import { FaTimes } from 'react-icons/fa';

interface DiaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date | null;
}

const DiaryModal: React.FC<DiaryModalProps> = ({ isOpen, onClose, selectedDate }) => {
    if (!isOpen || !selectedDate) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Container */}
            <div className="relative w-full max-w-md bg-bg-secondary rounded-2xl shadow-2xl p-6 transform transition-all animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                <DiaryForm
                    date={selectedDate}
                    onCancel={onClose}
                    onSubmit={(data) => {
                        console.log('Diary Submit:', data);
                        onClose();
                    }}
                />
            </div>
        </div>,
        document.body
    );
};

export default DiaryModal;
