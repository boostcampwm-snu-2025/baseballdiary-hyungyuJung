import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import DiaryCreate from './DiaryCreate';
import DiaryRead from './DiaryRead';
import DiaryEdit from './DiaryEdit';
import { baseballApi } from '../../api/baseballApi';
import { formatDate } from '../../utils/dateUtils';
import { useToast } from '../../context/ToastContext';
import type { Diary } from '../../types/Diary';

interface DiaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date | null;
}

type DiaryMode = 'create' | 'read' | 'edit';

const DiaryModal: React.FC<DiaryModalProps> = ({ isOpen, onClose, selectedDate }) => {
    const [mode, setMode] = useState<DiaryMode>('create');
    const [diaryData, setDiaryData] = useState<Diary | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        if (isOpen && selectedDate) {
            const dateStr = formatDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            baseballApi.getDiary(dateStr)
                .then(data => {
                    if (data) {
                        setDiaryData(data);
                        setMode('read');
                    } else {
                        setDiaryData(null);
                        setMode('create');
                    }
                })
                .catch(err => {
                    console.error("Failed to load diary", err);
                    showToast("Failed to load diary entry", 'error');
                    onClose();
                });
        }
    }, [isOpen, selectedDate, showToast, onClose]);

    const handleCreate = async (data: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await baseballApi.createDiary(data);
            if (selectedDate) {
                const dateStr = formatDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                const newData = await baseballApi.getDiary(dateStr);
                setDiaryData(newData);
                setMode('read');
            }
        } catch (_error) {
            showToast("Failed to create diary", 'error');
        }
    };

    const handleUpdate = async (data: Diary) => {
        if (!selectedDate) return;
        try {
            const dateStr = formatDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            await baseballApi.updateDiary(dateStr, data);
            setDiaryData(data);
            setMode('read');
        } catch (_error) {
            showToast("Failed to update diary", 'error');
        }
    };

    const handleDelete = async () => {
        if (!selectedDate) return;
        if (!confirm('Are you sure you want to delete this diary?')) return;
        try {
            const dateStr = formatDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            await baseballApi.deleteDiary(dateStr);
            onClose();
        } catch (_error) {
            showToast("Failed to delete diary", 'error');
        }
    };

    if (!isOpen || !selectedDate) return null;

    const renderContent = () => {
        switch (mode) {
            case 'create':
                return (
                    <DiaryCreate
                        date={selectedDate}
                        onCancel={onClose}
                        onSubmit={handleCreate}
                    />
                );
            case 'read':
                return diaryData ? (
                    <DiaryRead
                        diary={diaryData}
                        onEdit={() => setMode('edit')}
                        onClose={onClose}
                        onDelete={handleDelete}
                    />
                ) : null;
            case 'edit':
                return diaryData ? (
                    <DiaryEdit
                        diary={diaryData}
                        onCancel={() => setMode('read')}
                        onSave={handleUpdate}
                    />
                ) : null;
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
