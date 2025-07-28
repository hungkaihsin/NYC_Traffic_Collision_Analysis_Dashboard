import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx';
import CrashOverview from './pages/CrashOverview.jsx';
import useDarkMode from './hooks/useDarkMode.js';


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
        
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;