import { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './LocationsPage.css';

function LocationsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/by-borough')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-container fadeUp">
      <h1 className="page-title">📍 Crashes by Borough</h1>
      <div className="chart-wrapper">
        <Plot
          data={[{
            type: 'bar',
            x: data.map(d => d['BOROUGH']),
            y: data.map(d => d['Crashes']),
            marker: { color: '#6c63ff' }
          }]}
          layout={{
            title: {
              text: 'Crash Counts by Borough',
              font: { size: 20 },
              x: 0.5,
              xanchor: 'center'
            },
            margin: { t: 60, b: 40 },
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
  );
}

export default LocationsPage;