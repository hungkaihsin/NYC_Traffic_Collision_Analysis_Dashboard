import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import CrashOverview from './pages/CrashOverview.jsx';
import useDarkMode from './hooks/useDarkMode.js';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="app">
      <HashRouter>
        <Sidebar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(prev => !prev)}
        />
        <Routes>
          <Route path="/" element={<CrashOverview />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;