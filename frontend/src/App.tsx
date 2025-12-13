import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
    </Routes>
  );
}

export default App;
