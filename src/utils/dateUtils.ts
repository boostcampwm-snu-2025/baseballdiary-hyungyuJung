export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

export const getPreviousMonth = (year: number, month: number): { year: number; month: number } => {
    if (month === 0) {
        return { year: year - 1, month: 11 };
    }
    return { year, month: month - 1 };
};

export const getNextMonth = (year: number, month: number): { year: number; month: number } => {
    if (month === 11) {
        return { year: year + 1, month: 0 };
    }
    return { year, month: month + 1 };
};

export const formatDate = (year: number, month: number, day: number): string => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
};
