const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_DIR = path.join(__dirname, '../data');
const USER_TEAM_FILE = path.join(DATA_DIR, 'userteam.json');

const TEAMS = [
    'KIA Tigers', 'Samsung Lions', 'LG Twins', 'Doosan Bears', 'KT Wiz',
    'SSG Landers', 'Lotte Giants', 'Hanwha Eagles', 'NC Dinos', 'Kiwoom Heroes'
];

// Helper to read user team
const getUserTeam = () => {
    if (!fs.existsSync(USER_TEAM_FILE)) return null;
    try {
        const data = fs.readFileSync(USER_TEAM_FILE, 'utf8');
        return JSON.parse(data).team;
    } catch (e) {
        return null;
    }
};

// Helper to save user team
const saveUserTeam = (team) => {
    fs.writeFileSync(USER_TEAM_FILE, JSON.stringify({ team }));
};

// GET /api/user/team
router.get('/team', (req, res) => {
    const team = getUserTeam();
    res.json({ team });
});

// POST /api/user/team
router.post('/team', (req, res) => {
    const { team } = req.body;
    if (!team || !TEAMS.includes(team)) {
        return res.status(400).json({ error: 'Invalid team name' });
    }
    saveUserTeam(team);
    res.json({ success: true, team });
});

module.exports = router;
