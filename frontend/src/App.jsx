
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import CrashOverview from './pages/CrashOverview.jsx'
import CrashChart from './pages/CrashChart.jsx'
import './App.css'


function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Redirect root to /predict */}
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<CrashOverview/>} />
        <Route path="/chart" element={<CrashChart/>} />

        {/* later you can add more pages here */}
      </Routes>
    </HashRouter>
  )
}


export default App

