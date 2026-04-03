import Plot from 'react-plotly.js';
import { useEffect, useState, useMemo } from 'react';

function ChartCard({ title, data, layout, delay = 0 }) {
  const [theme, setTheme] = useState(document.body.dataset.theme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.dataset.theme);
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const plotLayout = useMemo(() => ({
    ...layout,
    title: {
      text: title,
      font: {
        size: 16,
        weight: 600,
        color: isDark ? '#e8eaed' : '#1a1d2e',
        family: "'Inter', sans-serif",
      },
      x: 0.5,
      xanchor: 'center',
    },
    font: {
      color: isDark ? '#9aa0b0' : '#6b7280',
      family: "'Inter', sans-serif",
      size: 12,
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    autosize: true,
    xaxis: {
      ...layout?.xaxis,
      gridcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
      zerolinecolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    },
    yaxis: {
      ...layout?.yaxis,
      gridcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
      zerolinecolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    },
  }), [layout, title, theme]);

  return (
    <div
      className="chart-card-modern"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Plot
        data={data}
        layout={plotLayout}
        useResizeHandler
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default ChartCard;