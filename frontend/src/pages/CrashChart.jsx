// src/components/CrashChart.jsx

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import './CrashChart.css'; // for optional custom styles

const CrashChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/summary')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const streetNames = data.map(d => d["Street Name"]);
  const crashes = data.map(d => d["Number of Crashes"]);
  const injuries = data.map(d => d["Number of Injuries"]);

  return (
    <div className="section-container fadeUp delay-2">
      <h2 className="text-center">Top Crash Streets</h2>
      <Plot
        data={[
          {
            x: crashes,
            y: streetNames,
            type: 'bar',
            orientation: 'h',
            name: 'Crashes',
            marker: { color: '#e57373' },
          },
          {
            x: injuries,
            y: streetNames,
            type: 'bar',
            orientation: 'h',
            name: 'Injuries',
            marker: { color: '#c62828' },
          }
        ]}
        layout={{
          barmode: 'overlay',
          width: 800,
          height: 500,
          margin: { l: 150, r: 30, t: 40, b: 40 },
          paper_bgcolor: '#c8c0c0',
          plot_bgcolor: '#c8c0c0',
          font: { color: '#111', family: 'Roboto, Segoe UI, sans-serif' },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default CrashChart;