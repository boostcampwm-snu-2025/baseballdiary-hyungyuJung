const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_DIR = path.join(__dirname, '../data');
const DIARY_FILE = path.join(DATA_DIR, 'diaries.json');

const getDiaries = () => {
    if (!fs.existsSync(DIARY_FILE)) return [];
    try {
        return JSON.parse(fs.readFileSync(DIARY_FILE, 'utf8'));
    } catch (e) {
        return [];
    }
};

const calculateStats = (diaries) => {
    const stats = {
        games: 0,
        win: 0,
        draw: 0,
        loss: 0,
        totalScore: 0,
        totalOpponentScore: 0
    };

    diaries.forEach(d => {
        stats.games++;
        if (d.gameInfo.result === 'win') stats.win++;
        else if (d.gameInfo.result === 'draw') stats.draw++;
        else if (d.gameInfo.result === 'loss') stats.loss++;

        stats.totalScore += d.gameInfo.myScore;
        stats.totalOpponentScore += d.gameInfo.opponentScore;
    });

    return {
        ...stats,
        winRate: stats.games > 0 ? (stats.win / stats.games) : 0,
        avgScore: stats.games > 0 ? (stats.totalScore / stats.games) : 0,
        avgOpponentScore: stats.games > 0 ? (stats.totalOpponentScore / stats.games) : 0
    };
};

router.get('/', (req, res) => {
    const diaries = getDiaries();

    // Overall
    const overall = calculateStats(diaries);

    // Yearly
    const yearlyMap = {};
    // Monthly
    const monthlyMap = {};

    diaries.forEach(d => {
        const date = new Date(d.date);
        const year = date.getFullYear();
        const month = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!yearlyMap[year]) yearlyMap[year] = [];
        yearlyMap[year].push(d);

        if (!monthlyMap[month]) monthlyMap[month] = [];
        monthlyMap[month].push(d);
    });

    const yearly = {};
    Object.keys(yearlyMap).forEach(year => {
        yearly[year] = calculateStats(yearlyMap[year]);
    });

    const monthly = {};
    Object.keys(monthlyMap).forEach(month => {
        monthly[month] = calculateStats(monthlyMap[month]);
    });

    res.json({
        overall,
        yearly,
        monthly
    });
});

module.exports = router;
