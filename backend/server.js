const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes'); // New Route

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Routes
app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/diaries', diaryRoutes);
app.use('/api/statistics', statisticsRoutes)

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
