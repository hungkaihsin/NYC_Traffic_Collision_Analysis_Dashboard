import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx';
import CrashOverview from './pages/CrashOverview.jsx';
import useDarkMode from './hooks/useDarkMode.js';
import LocationsPage from './pages/LocationsPage.jsx';
import TimesPage from './pages/TimesPage.jsx';
import CollisionsPage from './pages/CollisionsPage.jsx';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="app">
      <HashRouter>
      <Sidebar />
      <button className="theme-toggle" onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Routes>
        <Route path="/" element={<CrashOverview />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/times" element={<TimesPage />} />
        <Route path="/collisions" element={<CollisionsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;