import { useState } from 'react';
import { FaChartBar, FaBars, FaMoon, FaSun, FaGithub, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ darkMode, onToggleTheme }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" onClick={() => setCollapsed(!collapsed)}>
        <FaBars className="sidebar-toggle-icon" />
        {!collapsed && <span className="sidebar-brand">TrafficStats</span>}
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link active" id="nav-dashboard">
              <FaChartBar className="nav-icon" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          id="theme-toggle"
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun className="nav-icon" /> : <FaMoon className="nav-icon" />}
          {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <div className="sidebar-links">
          <a
            href="https://github.com/hungkaihsin/traffic_analyze"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link"
            id="github-link"
          >
            <FaGithub className="nav-icon" />
            {!collapsed && <span>GitHub</span>}
          </a>
          <a
            href="https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link"
            id="data-source-link"
          >
            <FaDatabase className="nav-icon" />
            {!collapsed && <span>Data Source</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;