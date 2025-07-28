import { useState } from 'react';
import { FaChartBar, FaMapMarkerAlt, FaClock, FaCarCrash, FaBars } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo" onClick={() => setCollapsed(!collapsed)}>
        <FaBars /> {!collapsed && <span>TrafficStats</span>}
      </div>
      <nav>
        <ul>
          <li><FaChartBar /> {!collapsed && 'Dashboard'}</li>
          <li><FaMapMarkerAlt /> {!collapsed && 'Locations'}</li>
          <li><FaClock /> {!collapsed && 'Times'}</li>
          <li><FaCarCrash /> {!collapsed && 'Collisions'}</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;