import Sidebar from './components/Sidebar.jsx';
import CrashOverview from './pages/CrashOverview';
import useDarkMode from './hooks/useDarkMode';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="app">
      <Sidebar />
      <button className="theme-toggle" onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      <CrashOverview />
    </div>
  );
}

export default App;