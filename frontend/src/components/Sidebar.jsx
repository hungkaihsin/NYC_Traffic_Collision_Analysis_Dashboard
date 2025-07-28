import { useState } from 'react';
import { FaChartBar, FaMapMarkerAlt, FaClock, FaCarCrash, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
          <li>
            <Link to="/">
              <FaChartBar /> {!collapsed && 'Dashboard'}
            </Link>
          </li>
      
         
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;