import { useEffect, useState } from 'react';
import ChartCard from '../components/ChartCard';
import StatCards from '../components/StatCards';
import LoadingSpinner from '../components/LoadingSpinner';
import './CrashOverview.css';

function CrashOverview() {
  const [summary, setSummary] = useState([]);
  const [trends, setTrends] = useState([]);
  const [boroughs, setBoroughs] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, trendsRes, boroughRes, hourlyRes, statsRes] = await Promise.all([
          fetch('/data/summary.json').then(r => r.json()),
          fetch('/data/trends.json').then(r => r.json()),
          fetch('/data/borough-injuries.json').then(r => r.json()),
          fetch('/data/hourly-crashes.json').then(r => r.json()),
          fetch('/data/stats.json').then(r => r.json()),
        ]);
        setSummary(summaryRes);
        setTrends(trendsRes);
        setBoroughs(boroughRes);
        setHourly(hourlyRes);
        setStats(statsRes);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <main className="main-content">
        <div className="error-banner" id="error-message">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title" id="dashboard-title">NYC Traffic Dashboard</h1>
        <p className="dashboard-subtitle">
          Analyzing {stats?.totalCrashes?.toLocaleString() ?? '...'} motor vehicle collisions across New York City
        </p>
      </div>

      {loading ? (
        <>
          <div className="stat-cards-row">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton-card" style={{ height: 90 }}>
                <div className="skeleton-title" style={{ width: '40%' }} />
                <div className="skeleton-chart" style={{ flex: 'none', height: 24 }} />
              </div>
            ))}
          </div>
          <LoadingSpinner count={4} />
        </>
      ) : (
        <>
          <StatCards stats={stats} />

          <div className="chart-grid-modern" id="chart-grid">
            <ChartCard
              title="Top 10 Crash-Prone Streets"
              delay={100}
              data={[{
                type: 'bar',
                x: summary.map(s => s['Number of Crashes']),
                y: summary.map(s => s['Street Name']),
                orientation: 'h',
                marker: {
                  color: summary.map((_, i) =>
                    `rgba(108, 99, 255, ${1 - i * 0.08})`
                  ),
                  line: { width: 0 },
                },
                hovertemplate: '<b>%{y}</b><br>Crashes: %{x:,}<extra></extra>',
              }]}
              layout={{
                margin: { l: 200, r: 20, t: 50, b: 40 },
                yaxis: { autorange: 'reversed' },
              }}
            />
            <ChartCard
              title="Crashes Over Time"
              delay={200}
              data={[{
                type: 'scatter',
                mode: 'lines',
                x: trends.map(t => t['YearMonth']),
                y: trends.map(t => t['Crashes']),
                line: { color: '#6c63ff', width: 2.5, shape: 'spline' },
                fill: 'tozeroy',
                fillcolor: 'rgba(108, 99, 255, 0.08)',
                hovertemplate: '<b>%{x}</b><br>Crashes: %{y:,}<extra></extra>',
              }]}
              layout={{ margin: { t: 50, b: 50, l: 60, r: 20 } }}
            />
            <ChartCard
              title="Injuries by Borough"
              delay={300}
              data={[{
                type: 'pie',
                labels: boroughs.map(b => b['BOROUGH']),
                values: boroughs.map(b => b['Injuries']),
                textinfo: 'label+percent',
                hole: 0.5,
                marker: {
                  colors: ['#6c63ff', '#ffa726', '#00d4aa', '#ff6b6b', '#ab47bc'],
                  line: { width: 2, color: 'transparent' },
                },
                textfont: { size: 12 },
                hovertemplate: '<b>%{label}</b><br>Injuries: %{value:,}<br>%{percent}<extra></extra>',
              }]}
              layout={{ margin: { t: 50, b: 40, l: 20, r: 20 } }}
            />
            <ChartCard
              title="Crashes by Hour of Day"
              delay={400}
              data={[{
                type: 'bar',
                x: hourly.map(h => `${h['Hour']}:00`),
                y: hourly.map(h => h['Crashes']),
                marker: {
                  color: hourly.map(h => {
                    const peak = Math.max(...hourly.map(hh => hh.Crashes));
                    const ratio = h.Crashes / peak;
                    return `rgba(0, 212, 170, ${0.3 + ratio * 0.7})`;
                  }),
                  line: { width: 0 },
                },
                hovertemplate: '<b>%{x}</b><br>Crashes: %{y:,}<extra></extra>',
              }]}
              layout={{ margin: { t: 50, b: 60, l: 60, r: 20 } }}
            />
          </div>

          {/* Insights Section */}
          <section className="analysis-section" id="insights-section">
            <h2>Insights &amp; Analysis</h2>
            <div className="insight-grid">
              <div className="insight-card">
                <div className="insight-icon">🛣️</div>
                <div className="insight-content">
                  <h3>Most Dangerous Streets</h3>
                  <p>
                    Broadway leads in crash frequency, likely due to its complex layout and heavy tourism
                    near Times Square. Belt Parkway records the highest injury count, indicating more severe accidents.
                  </p>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">⏰</div>
                <div className="insight-content">
                  <h3>Rush Hour Peaks</h3>
                  <p>
                    Crashes peak at <strong>3 PM on weekdays</strong>, driven by rush-hour congestion.
                    This pattern is consistent across the top crash-prone streets, showing the strong influence of commuter traffic.
                  </p>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">💡</div>
                <div className="insight-content">
                  <h3>Recommendations</h3>
                  <ul>
                    <li>Redesign traffic flow and enforce speed controls on Broadway and Belt Parkway.</li>
                    <li>Launch awareness campaigns targeting drivers during weekday rush hours.</li>
                    <li>Improve pedestrian safety and signage in tourist-heavy areas like Times Square.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default CrashOverview;