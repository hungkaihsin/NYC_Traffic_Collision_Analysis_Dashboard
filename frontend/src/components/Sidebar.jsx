import { FaChartBar, FaMapMarkerAlt, FaClock, FaCarCrash } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">🚦TrafficStats</div>
      <nav>
        <ul>
          <li><FaChartBar /> Dashboard</li>
          <li><FaMapMarkerAlt /> Locations</li>
          <li><FaClock /> Times</li>
          <li><FaCarCrash /> Collisions</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;