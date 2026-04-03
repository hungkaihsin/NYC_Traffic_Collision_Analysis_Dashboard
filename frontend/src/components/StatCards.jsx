import { FaCarCrash, FaUserInjured, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './StatCard.css';

function StatCard({ icon, label, value, sub, color, delay }) {
  return (
    <div className="stat-card" style={{ '--accent-color': color, animationDelay: `${delay}ms` }}>
      <div className="stat-icon" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
        {sub && <span className="stat-sub">{sub}</span>}
      </div>
    </div>
  );
}

function StatCards({ stats }) {
  if (!stats) return null;

  const formatNumber = (n) => n?.toLocaleString() ?? '—';

  const cards = [
    {
      icon: <FaCarCrash size={22} />,
      label: 'Total Crashes',
      value: formatNumber(stats.totalCrashes),
      color: '#6c63ff',
      delay: 0,
    },
    {
      icon: <FaUserInjured size={22} />,
      label: 'Total Injuries',
      value: formatNumber(stats.totalInjuries),
      color: '#ff6b6b',
      delay: 80,
    },
    {
      icon: <FaMapMarkerAlt size={22} />,
      label: 'Most Affected Borough',
      value: stats.topBorough,
      sub: `${formatNumber(stats.topBoroughInjuries)} injuries`,
      color: '#00d4aa',
      delay: 160,
    },
    {
      icon: <FaClock size={22} />,
      label: 'Peak Hour',
      value: `${stats.peakHour}:00`,
      sub: `${formatNumber(stats.peakHourCrashes)} crashes`,
      color: '#ffa726',
      delay: 240,
    },
  ];

  return (
    <div className="stat-cards-row">
      {cards.map((c, i) => (
        <StatCard key={i} {...c} />
      ))}
    </div>
  );
}

export default StatCards;
