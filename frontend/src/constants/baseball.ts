export const KBO_TEAMS = [
    'KIA Tigers', 'Samsung Lions', 'LG Twins', 'Doosan Bears', 'KT Wiz',
    'SSG Landers', 'Lotte Giants', 'Hanwha Eagles', 'NC Dinos', 'Kiwoom Heroes'
];

export const TEAM_EMOJIS: Record<string, string> = {
    'KIA Tigers': '🐯',
    'Samsung Lions': '🦁',
    'LG Twins': '👯',
    'Doosan Bears': '🐻',
    'KT Wiz': '🎩',
    'SSG Landers': '👽',
    'Lotte Giants': '🕊️',
    'Hanwha Eagles': '🦅',
    'NC Dinos': '🦖',
    'Kiwoom Heroes': '😈'
};

export const getTeamDisplay = (teamName: string) => {
    if (!teamName) return '';
    const emoji = TEAM_EMOJIS[teamName] || '';
    const shortName = teamName.split(' ')[0]; // Take first word
    return `${shortName} ${emoji}`;
};

export const VIEWING_TYPES: { value: string; label: string }[] = [
    { value: 'direct', label: '직관' },
    { value: 'home', label: '집관' },
    { value: 'highlight', label: '하이라이트' },
    { value: 'score_check', label: '점수만 확인' },
];
