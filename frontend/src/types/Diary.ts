export type GameResult = 'win' | 'loss' | 'draw' | 'cancel';
export type ViewingType = 'direct' | 'home' | 'highlight' | 'score_check';

export interface GameInfo {
    myTeam: string;
    opponentTeam: string;
    myScore: number;
    opponentScore: number;
    result: GameResult;
    stadium: string;
    broadcaster: string;
}

export interface ViewingInfo {
    type: ViewingType;
}

export interface Diary {
    id: string;
    date: string; // ISO Date String YYYY-MM-DD
    gameInfo: GameInfo;
    viewingInfo: ViewingInfo;
    content: string; // Memo
    photoUrl?: string;
    createdAt: string; // ISO Timestamp
    updatedAt: string; // ISO Timestamp
}

export interface DiarySummary {
    date: string;
    result: GameResult;
    opponentTeam: string;
}
