import { useEffect, useState } from 'react';
import axios from 'axios';
import ChartCard from '../components/ChartCard';
import './CrashOverview.css';

function CrashOverview() {
  const [summary, setSummary] = useState([]);
  const [trends, setTrends] = useState([]);
  const [boroughs, setBoroughs] = useState([]);
  const [hourly, setHourly] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/summary').then(res => setSummary(res.data));
    axios.get('http://localhost:5001/api/trends').then(res => setTrends(res.data));
    axios.get('http://localhost:5001/api/borough-injuries').then(res => setBoroughs(res.data));
    axios.get('http://localhost:5001/api/hourly-crashes').then(res => setHourly(res.data));
  }, []);

  return (
    <main className="main-content">
      <h1 className="dashboard-title">NYC Traffic Dashboard</h1>
      <div className="chart-grid-modern">
        <ChartCard
          title="Top 10 Crash-Prone Streets"
          data={[{
            type: 'bar',
            x: summary.map(s => s['Number of Crashes']),
            y: summary.map(s => s['Street Name']),
            orientation: 'h',
            marker: { color: '#c0392b' }
          }]}
          layout={{ margin: { l: 250, r: 20, t: 50, b: 40 } }}
        />
        <ChartCard
          title="Crashes Over Time"
          data={[{
            type: 'scatter',
            mode: 'lines+markers',
            x: trends.map(t => t['YearMonth']),
            y: trends.map(t => t['Crashes']),
            marker: { color: '#2980b9' }
          }]}
          layout={{ margin: { t: 50, b: 40 } }}
        />
        <ChartCard
          title="Injuries by Borough"
          data={[{
            type: 'pie',
            labels: boroughs.map(b => b['BOROUGH']),
            values: boroughs.map(b => b['Injuries']),
            textinfo: 'label+percent',
            hole: 0.4
          }]}
          layout={{ margin: { t: 50, b: 40 } }}
        />
        <ChartCard
          title="Crashes by Hour of Day"
          data={[{
            type: 'bar',
            x: hourly.map(h => `${h['Hour']}:00`),
            y: hourly.map(h => h['Crashes']),
            marker: { color: '#16a085' }
          }]}
          layout={{ margin: { t: 50, b: 50 } }}
        />
      </div>

      {/* Insights Section */}
      <section className="analysis-section">
        <h2>Insights & Analysis</h2>
        <p>
          Broadway leads in crash frequency, likely due to its complex layout and heavy tourism near Times Square.
          Belt Parkway records the highest injury count, indicating more severe accidents.
        </p>
        <p>
          Crashes peak at <strong>3 PM on weekdays</strong>, driven by rush-hour congestion. 
          This pattern is consistent across the top crash-prone streets, showing the strong influence of commuter traffic.
        </p>
        <p>
          <strong>Recommendations:</strong>
        </p>
        <ul>
          <li>Redesign traffic flow and enforce speed controls on Broadway and Belt Parkway.</li>
          <li>Launch awareness campaigns targeting drivers during weekday rush hours.</li>
          <li>Improve pedestrian safety and signage in tourist-heavy areas like Times Square.</li>
        </ul>
      </section>
    </main>
  );
}

export default CrashOverview;