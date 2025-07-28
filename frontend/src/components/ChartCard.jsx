import Plot from 'react-plotly.js';
import { useEffect, useState, useMemo } from 'react';

function ChartCard({ title, data, layout }) {
  // Stateful theme detection
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

  const plotLayout = useMemo(() => ({
    ...layout,
    title: {
      text: title,
      font: { size: 18, color: theme === 'dark' ? '#f5f5f5' : '#111' },
      x: 0.5,
      xanchor: 'center'
    },
    font: { color: theme === 'dark' ? '#f5f5f5' : '#111' },
    paper_bgcolor: theme === 'dark' ? '#2c2c2c' : '#ffffff',
    plot_bgcolor: theme === 'dark' ? '#2c2c2c' : '#ffffff',
    autosize: true
  }), [layout, title, theme]);

  return (
    <div className="chart-card-modern">
      <Plot
        data={data}
        layout={plotLayout}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default ChartCard;