import type { Diary, DiarySummary, StatisticsResponse } from '../types/Diary';

const BASE_URL = 'http://localhost:3000/api';

export interface GameDataResponse {
    date: string;
    myTeam: string;
    opponentTeam: string;
    myScore: number;
    opponentScore: number;
    result: 'win' | 'loss' | 'draw';
    stadium: string;
    broadcaster: string;
}

export const baseballApi = {
    // Get User Team
    getUserTeam: async (): Promise<string | null> => {
        const res = await fetch(`${BASE_URL}/user/team`);
        if (!res.ok) throw new Error('Failed to fetch user team');
        const data = await res.json();
        return data.team;
    },

    // Update User Team
    updateUserTeam: async (team: string): Promise<void> => {
        const res = await fetch(`${BASE_URL}/user/team`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ team }),
        });
        if (!res.ok) throw new Error('Failed to update team');
    },

    // Get Random Game Data
    getRandomGame: async (date: string): Promise<GameDataResponse> => {
        const res = await fetch(`${BASE_URL}/games/random?date=${date}`);
        if (!res.ok) throw new Error('Failed to fetch game data');
        return await res.json();
    },

    // --- Diary CRUD ---

    // Get Diary by Date
    getDiary: async (date: string): Promise<Diary | null> => {
        const res = await fetch(`${BASE_URL}/diaries/${date}`);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error('Failed to fetch diary');
        return await res.json();
    },

    // Create Diary
    createDiary: async (diary: Omit<Diary, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
        const res = await fetch(`${BASE_URL}/diaries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(diary),
        });
        if (!res.ok) throw new Error('Failed to save diary');
    },

    // Update Diary
    updateDiary: async (date: string, diary: Diary): Promise<void> => {
        const res = await fetch(`${BASE_URL}/diaries/${date}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(diary),
        });
        if (!res.ok) throw new Error('Failed to update diary');
    },

    // Delete Diary
    deleteDiary: async (date: string): Promise<void> => {
        const res = await fetch(`${BASE_URL}/diaries/${date}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete diary');
    },

    // Get Monthly Summaries
    getMonthlySummaries: async (year: number, month: number): Promise<DiarySummary[]> => {
        const res = await fetch(`${BASE_URL}/diaries/month/${year}/${month}`);
        if (!res.ok) throw new Error('Failed to fetch monthly summaries');
        return await res.json();
    },

    // Get Statistics
    getStatistics: async (): Promise<StatisticsResponse> => {
        const res = await fetch(`${BASE_URL}/statistics`);
        if (!res.ok) throw new Error('Failed to fetch statistics');
        return await res.json();
    }
};
