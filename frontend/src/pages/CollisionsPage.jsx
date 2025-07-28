import { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './CollisionsPage.css';

function CollisionsPage() {
  const [factors, setFactors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [injuryFatality, setInjuryFatality] = useState({ injuries: 0, fatalities: 0 });

  useEffect(() => {
    axios.get('http://localhost:5001/api/contributing-factors')
      .then((res) => setFactors(res.data))
      .catch((err) => console.error(err));

    axios.get('http://localhost:5001/api/vehicle-types')
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err));

    axios.get('http://localhost:5001/api/injury-fatality')
      .then((res) => setInjuryFatality(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-container fadeUp">
      <h1 className="page-title">🚗 Collision Analysis</h1>
      <div className="chart-grid">
        {/* Top Contributing Factors */}
        <div className="chart-wrapper">
          <Plot
            data={[{
              type: 'bar',
              x: factors.map(f => f['Count']),
              y: factors.map(f => f['CONTRIBUTING FACTOR VEHICLE 1']),
              orientation: 'h',
              marker: { color: '#e67e22' }
            }]}
            layout={{
              title: {
                text: 'Top 10 Contributing Factors',
                font: { size: 18, color: 'var(--text)' },
                x: 0.5,
                xanchor: 'center'
              },
              margin: { l: 250, r: 20, t: 50, b: 40 },
              autosize: true,
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { color: 'var(--text)' }
            }}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Top Vehicle Types */}
        <div className="chart-wrapper">
          <Plot
            data={[{
              type: 'bar',
              x: vehicles.map(v => v['Count']),
              y: vehicles.map(v => v['VEHICLE TYPE CODE 1']),
              orientation: 'h',
              marker: { color: '#3498db' }
            }]}
            layout={{
              title: {
                text: 'Top Vehicle Types in Crashes',
                font: { size: 18, color: 'var(--text)' },
                x: 0.5,
                xanchor: 'center'
              },
              margin: { l: 220, r: 20, t: 50, b: 40 },
              autosize: true,
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { color: 'var(--text)' }
            }}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Injury vs Fatality */}
        <div className="chart-wrapper">
          <Plot
            data={[{
              type: 'bar',
              x: ['Injuries', 'Fatalities'],
              y: [injuryFatality.injuries, injuryFatality.fatalities],
              marker: { color: ['#2ecc71', '#e74c3c'] }
            }]}
            layout={{
              title: {
                text: 'Injury vs Fatality Count',
                font: { size: 18, color: 'var(--text)' },
                x: 0.5,
                xanchor: 'center'
              },
              margin: { t: 50, b: 40 },
              autosize: true,
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { color: 'var(--text)' }
            }}
            useResizeHandler
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default CollisionsPage;