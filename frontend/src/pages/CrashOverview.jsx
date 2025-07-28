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
    <div className="dashboard-container fadeUp delay-2">
      <h1 className="dashboard-title">Traffic Data Dashboard</h1>
      <div className="chart-grid">
        <ChartCard
          title="Top 10 Crash-Prone Streets"
          data={[{
            type: 'bar',
            x: summary.map(s => s['Number of Crashes']),
            y: summary.map(s => s['Street Name']),
            orientation: 'h',
            marker: { color: '#c0392b' }
          }]}
          layout={{ margin: { l: 120, r: 20, t: 30, b: 40 } }}
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
          layout={{ margin: { t: 30, b: 40 } }}
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
          layout={{ margin: { t: 30, b: 40 } }}
        />

        <ChartCard
          title="Crashes by Hour of Day"
          data={[{
            type: 'bar',
            x: hourly.map(h => `${h['Hour']}:00`),
            y: hourly.map(h => h['Crashes']),
            marker: { color: '#16a085' }
          }]}
          layout={{ margin: { t: 30, b: 40 } }}
        />
      </div>
    </div>
  );
}

export default CrashOverview;