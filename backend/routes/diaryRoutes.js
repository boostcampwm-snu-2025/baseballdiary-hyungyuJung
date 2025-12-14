const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_DIR = path.join(__dirname, '../data');
const DIARY_FILE = path.join(DATA_DIR, 'diaries.json');
const SUMMARY_FILE = path.join(DATA_DIR, 'diary-summaries.json');

// Helper to read diaries
const getDiaries = () => {
    if (!fs.existsSync(DIARY_FILE)) return [];
    try {
        const data = fs.readFileSync(DIARY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

// Helper to save diaries
const saveDiaries = (diaries) => {
    fs.writeFileSync(DIARY_FILE, JSON.stringify(diaries, null, 2));
};

// Helper to read summaries
const getSummaries = () => {
    if (!fs.existsSync(SUMMARY_FILE)) return [];
    try {
        const data = fs.readFileSync(SUMMARY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

// Helper to save summaries
const saveSummaries = (summaries) => {
    fs.writeFileSync(SUMMARY_FILE, JSON.stringify(summaries, null, 2));
};

// Initial Sync: Populate summaries if missing but diaries exist
const initialSync = () => {
    const diaries = getDiaries();
    const summaries = getSummaries();

    if (diaries.length > 0 && summaries.length === 0) {
        console.log('Populating diary-summaries.json from diaries.json...');
        const newSummaries = diaries.map(d => ({
            date: d.date,
            result: d.gameInfo.result,
            opponentTeam: d.gameInfo.opponentTeam
        }));
        saveSummaries(newSummaries);
    }
};
initialSync();


// Sync Function: Updates summary based on full diary object
const updateSummary = (diary, isDelete = false) => {
    let summaries = getSummaries();

    if (isDelete) {
        summaries = summaries.filter(s => s.date !== diary.date);
    } else {
        const summaryIndex = summaries.findIndex(s => s.date === diary.date);
        const newSummary = {
            date: diary.date,
            result: diary.gameInfo.result,
            opponentTeam: diary.gameInfo.opponentTeam
        };

        if (summaryIndex !== -1) {
            summaries[summaryIndex] = newSummary;
        } else {
            summaries.push(newSummary);
        }
    }
    saveSummaries(summaries);
};


// GET /api/diaries/:date
router.get('/:date', (req, res) => {
    const { date } = req.params;
    const diaries = getDiaries();
    const diary = diaries.find(d => d.date === date);

    if (!diary) {
        return res.status(404).json({ message: 'Diary not found' });
    }
    res.json(diary);
});

// GET /api/diaries/month/:year/:month
router.get('/month/:year/:month', (req, res) => {
    const { year, month } = req.params;
    // month is 1-based string, e.g., "1", "12"
    // Pad month to 2 digits for string comparison
    const paddedMonth = String(month).padStart(2, '0');
    const prefix = `${year}-${paddedMonth}`;

    const summaries = getSummaries();
    const monthlySummaries = summaries.filter(s => s.date.startsWith(prefix));

    res.json(monthlySummaries);
});

// POST /api/diaries
router.post('/', (req, res) => {
    const newDiary = req.body;
    if (!newDiary.date) {
        return res.status(400).json({ error: 'Date is required' });
    }

    const diaries = getDiaries();
    const existingIndex = diaries.findIndex(d => d.date === newDiary.date);

    if (existingIndex !== -1) {
        return res.status(409).json({ error: 'Diary for this date already exists' });
    }

    // Add ID and Timestamps
    newDiary.id = Date.now().toString();
    newDiary.createdAt = new Date().toISOString();
    newDiary.updatedAt = new Date().toISOString();

    diaries.push(newDiary);
    saveDiaries(diaries);
    updateSummary(newDiary); // Sync Summary

    res.status(201).json(newDiary);
});

// PUT /api/diaries/:date
router.put('/:date', (req, res) => {
    const { date } = req.params;
    const updates = req.body;

    const diaries = getDiaries();
    const diaryIndex = diaries.findIndex(d => d.date === date);

    if (diaryIndex === -1) {
        return res.status(404).json({ error: 'Diary not found' });
    }

    // Update fields
    const updatedDiary = {
        ...diaries[diaryIndex],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    // Protect immutable fields if necessary (like id, createdAt) by overwriting them back if they were in upgrades
    updatedDiary.id = diaries[diaryIndex].id;
    updatedDiary.date = diaries[diaryIndex].date; // Ensure date key doesn't change via body
    updatedDiary.createdAt = diaries[diaryIndex].createdAt;

    diaries[diaryIndex] = updatedDiary;
    saveDiaries(diaries);
    updateSummary(updatedDiary); // Sync Summary

    res.json(updatedDiary);
});

// DELETE /api/diaries/:date
router.delete('/:date', (req, res) => {
    const { date } = req.params;
    let diaries = getDiaries();
    const initialLength = diaries.length;

    diaries = diaries.filter(d => d.date !== date);

    if (diaries.length === initialLength) {
        return res.status(404).json({ error: 'Diary not found' });
    }

    saveDiaries(diaries);
    updateSummary({ date }, true); // Sync Summary (Delete)
    res.json({ success: true });
});

module.exports = router;
