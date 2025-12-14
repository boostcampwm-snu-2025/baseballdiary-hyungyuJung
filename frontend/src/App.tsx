import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/StatisticsPage';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
